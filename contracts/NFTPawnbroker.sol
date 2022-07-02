//SPDX-License-Identifier: MIT
// contracts/NFTPawnbroker.sol

pragma solidity >=0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./NFT.sol";

contract NFTPawnbroker is IERC721Receiver {

    address payable borrower;
    address payable lender;
    address immutable nftContract;
    uint256 nftCollateral;
    uint256 ammount;
    uint256 immutable expiration;

    constructor(uint256 _nftCollateral, address _nftContract, uint256 _ammount, uint64 _timeInSeconds) {
        require(_nftCollateral > 0);
        nftCollateral = _nftCollateral;
        nftContract =_nftContract;
        ammount = _ammount;
        expiration = block.timestamp + _timeInSeconds;
        borrower = payable(msg.sender);
    }

    function lend() payable public {
        require(msg.value > ammount, "Insufficient ammount");
        lender = payable(msg.sender);
        // transfer nft to this contract
        NFT nft = NFT(nftContract);
        nft.safeTransferFrom(borrower, address(this), nftCollateral);
        // transfer value to NFT holder
        borrower.transfer(ammount);
    }

    function appropriate() public {
        require(msg.sender == lender, "Only lender can approppriate NFT");
        require(block.timestamp > expiration, "Deadline for reclaiming NFT has not expired");
        // transfer NFT to lender
        NFT nft = NFT(nftContract);
        nft.safeTransferFrom(address(this), lender, nftCollateral);
        nftCollateral = 0;
    }

    function reClaim() payable public {
        require(nftCollateral > 0, "Collateral was appropriated");
        // TODO interest
        require(msg.value > ammount);
        // transfer value to lender
        lender.transfer(ammount);
        // transfer NFT to borrower
        NFT nft = NFT(nftContract);
        nft.safeTransferFrom(address(this), borrower, nftCollateral);
    }

    function onERC721Received(
        address ,
        address ,
        uint256 ,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}