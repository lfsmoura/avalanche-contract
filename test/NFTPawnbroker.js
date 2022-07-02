const { expect, assert } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');
const Web3 = require('web3');

describe('NFTPawnbroker', function () {
    before(async function () {
        this.NFTPawnbroker = await ethers.getContractFactory("NFTPawnbroker");
        this.NFT = await ethers.getContractFactory("NFT");
        const signers = await ethers.getSigners();
        this.lender = signers[0];
        this.borrower = signers[1];
    });

    beforeEach(async function () {
        this.nft = await this.NFT.deploy()
        await this.nft.deployed()
    });

    describe("lending", function () {
        it('lend NFT happy path', async function () {
            const itemTx = await this.nft.awardItem(this.borrower.address);
            await itemTx.wait();
            
            const itemId = 1;
            expect(await this.nft.ownerOf(itemId)).to.be.equal(this.borrower.address);

            const nFTPawnbroker = await this.NFTPawnbroker.deploy(itemId, 100, 1);
            await nFTPawnbroker.deployed();

            const nftConnectedToBorrower = this.nft.connect(this.borrower);
            await nftConnectedToBorrower.approve(nFTPawnbroker.address, itemId);

            let options = {
                value: ethers.utils.parseEther("100.0")  
            }
            const nFTPawnbrokerConnectedToLender = nFTPawnbroker.connect(this.lender);

            let borrowerBalanceBeforeLending = await hre.ethers.provider.getBalance(this.borrower.address);

            const lendTx = await nFTPawnbrokerConnectedToLender.lend(options);
            await lendTx.wait();

            const borrowerBalanceAfterLending = await hre.ethers.provider.getBalance(this.borrower.address);
            assert.isTrue(borrowerBalanceBeforeLending.lt(borrowerBalanceAfterLending), "Expected funds to be transferred to borrower");

            expect(await this.nft.ownerOf(itemId)).to.be.equal(nFTPawnbroker.address);

            const nFTPawnbrokerConnectedToBorrower = nFTPawnbroker.connect(this.borrower);
            const reclaimTx = nFTPawnbrokerConnectedToBorrower.reClaim(options);

            const borrowerBalanceAfterReclaiming = await hre.ethers.provider.getBalance(this.borrower.address);
            assert.isTrue(borrowerBalanceAfterLending.lt(borrowerBalanceAfterReclaiming), "Expected funds to be transferred from borrower to get NFT back");
            expect(await this.nft.ownerOf(itemId)).to.be.equal(this.borrower.address);
        });
    });
});