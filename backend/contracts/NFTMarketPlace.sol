//SPDX-License-Identifier: UNLICENSED
//contract address : 0xB44C91280a8aE0A57452dC5a23D0d5B440a9E891

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketPlace {
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings; // contract -> id ->listing

    // modifier for owner
    modifier isNFTOwner(address _nftcontract, uint256 _tokenId) {
        require(
            // nft must belong to sender
            IERC721(_nftcontract).ownerOf(_tokenId) == msg.sender,
            "you cannot list a nft which doesnot belongs to you"
        );
        _;
    }

    modifier isNotListed(address _nftcontract, uint256 _tokenId) {
        //nft should not be there previously
        require(
            listings[_nftcontract][_tokenId].price == 0,
            "nft already listed"
        );
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokenId].price > 0, "MRKT: Not listed");
        _;
    }

    event ListingCreated(
        address nftaddress,
        uint256 tokenId,
        uint256 price,
        address seller
    );

    event ListingCanceled(address nftContract, uint256 tokenId, address seller);

    event ListingUpdated(
        address nftContract,
        uint256 tokenId,
        uint256 newPrice,
        address seller
    );

    event ListingPurchased(
        address nftContract,
        uint256 tokenId,
        address seller,
        address buyer
    );

    function createListing(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    )
        external
        isNFTOwner(_nftContract, _tokenId)
        isNotListed(_nftContract, _tokenId)
    {
        //price should be greater than zero
        require(_price > 0, "please provide a valid price for nft");
        IERC721 nftContract = IERC721(_nftContract);
        //contract should be approved before listing
        require(
            nftContract.isApprovedForAll(msg.sender, address(this)) ||
                nftContract.getApproved(_tokenId) == address(this),
            "market is not approved to transact this nft"
        );
        // now list the nft
        listings[_nftContract][_tokenId] = Listing({
            price: _price,
            seller: msg.sender
        });
        //emit a event
        emit ListingCreated(_nftContract, _tokenId, _price, msg.sender);
    }

    function cancelListing(address _nftcontract, uint256 _tokenId)
        external
        isListed(_nftcontract, _tokenId)
        isNFTOwner(_nftcontract, _tokenId)
    {
        delete listings[_nftcontract][_tokenId];
        emit ListingCanceled(_nftcontract, _tokenId, msg.sender);
    }

    function updateListing(
        address _nftcontract,
        uint256 _tokenId,
        uint256 newPrice
    )
        external
        isListed(_nftcontract, _tokenId)
        isNFTOwner(_nftcontract, _tokenId)
    {
        require(newPrice > 0, "price is too low to update");
        listings[_nftcontract][_tokenId].price = newPrice;
        emit ListingUpdated(_nftcontract, _tokenId, newPrice, msg.sender);
    }

    function purchaseListing(address _nftcontract, uint256 _tokenId)
        external
        payable
        isListed(_nftcontract, _tokenId)
    {
        Listing memory listing = listings[_nftcontract][_tokenId];
        require(
            msg.value == listing.price,
            "send the correct amount to buy nft"
        );
        delete listings[_nftcontract][_tokenId];
        IERC721(_nftcontract).safeTransferFrom(
            listing.seller,
            msg.sender,
            _tokenId
        );
        (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
        require(sent, "transaction of ether failed");
        emit ListingPurchased(
            _nftcontract,
            _tokenId,
            listing.seller,
            msg.sender
        );
    }
}
