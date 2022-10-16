import {
  ListingCanceled,
  ListingCreated,
  ListingPurchased,
  ListingUpdated,
} from "../generated/NFTMarketPlace/NFTMarketPlace";
import { store } from "@graphprotocol/graph-ts";
import { ListingEntity } from "../generated/schema";

export function handleListingCreated(event: ListingCreated): void {
  const id =
    event.params.nftaddress.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex();

  let listing = new ListingEntity(id);

  listing.nftAddress = event.params.nftaddress;
  listing.seller = event.params.seller;
  listing.tokenId = event.params.tokenId;
  listing.price = event.params.price;

  listing.save();
}
export function handleListingUpdated(event: ListingUpdated): void {
  const id =
    event.params.nftContract.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex();

  let listing = ListingEntity.load(id);
  if (listing) {
    listing.price = event.params.newPrice;
    listing.save();
  }
}

export function handleListingCanceled(event: ListingCanceled): void {
  const id =
    event.params.nftContract.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex();

  let listing = ListingEntity.load(id);
  if (listing) {
    store.remove("ListingEntity", id);
  }
}

export function handleListingPurchased(event: ListingPurchased): void {
  const id =
    event.params.nftContract.toHex() +
    "-" +
    event.params.tokenId.toString() +
    "-" +
    event.params.seller.toHex();

  let listing = ListingEntity.load(id);
  if (listing) {
    listing.buyer = event.params.buyer;
    listing.save();
  }
}
