//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
//contract address : 0xc7Cc6f7a0D12c45bF5dE604fFffA26f8434AEbB8

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MintNFT is  ERC721{
   
    constructor()ERC721("CeloNFT","cNFT"){
        for(uint256 i=0;i<5;i++){ 
            _safeMint(msg.sender,i);
        }
    }

     function tokenURI(uint256) public pure override returns (string memory) {
        return "ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";
    }
    
    
}