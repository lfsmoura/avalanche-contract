//SPDX-License-Identifier: MIT
// contracts/NFTPawnbroker.sol

pragma solidity >=0.6.2;

contract NFTPawnbroker {
    //fallback() external payable {}

    address borrower;
    address lender;
    uint256 nftCollateral;
    uint256 timeInSeconds;
    uint256 ammount;

    constructor(uint256 _nftCollateral, uint256 _ammount, uint256 _timeInSeconds) {
        // check stuff
        // should authorize
        // store parameters
        nftCollateral = _nftCollateral;
        ammount = _ammount;
        timeInSeconds = _timeInSeconds;
    }

    function lend() payable public {
        require(msg.value > ammount, "Insufficient ammount");
        // transfer nft to this contract
        // transfer value to NFT holder
    }

    function exercise() public {
        // check if sender was the lender
        // check if time has elapsed
        // transfer NFT to lender
    }

    function reClaim() payable public {
        // TODO interest
        require(msg.value > ammount);
        // transfer value to lender
        // transfer NFT to borrower
    }
}