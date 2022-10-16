import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ListingCanceled,
  ListingCreated,
  ListingPurchased,
  ListingUpdated
} from "../generated/NFTMarketPlace/NFTMarketPlace"

export function createListingCanceledEvent(
  nftContract: Address,
  tokenId: BigInt,
  seller: Address
): ListingCanceled {
  let listingCanceledEvent = changetype<ListingCanceled>(newMockEvent())

  listingCanceledEvent.parameters = new Array()

  listingCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  listingCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listingCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCanceledEvent
}

export function createListingCreatedEvent(
  nftaddress: Address,
  tokenId: BigInt,
  price: BigInt,
  seller: Address
): ListingCreated {
  let listingCreatedEvent = changetype<ListingCreated>(newMockEvent())

  listingCreatedEvent.parameters = new Array()

  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftaddress",
      ethereum.Value.fromAddress(nftaddress)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCreatedEvent
}

export function createListingPurchasedEvent(
  nftContract: Address,
  tokenId: BigInt,
  seller: Address,
  buyer: Address
): ListingPurchased {
  let listingPurchasedEvent = changetype<ListingPurchased>(newMockEvent())

  listingPurchasedEvent.parameters = new Array()

  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return listingPurchasedEvent
}

export function createListingUpdatedEvent(
  nftContract: Address,
  tokenId: BigInt,
  newPrice: BigInt,
  seller: Address
): ListingUpdated {
  let listingUpdatedEvent = changetype<ListingUpdated>(newMockEvent())

  listingUpdatedEvent.parameters = new Array()

  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingUpdatedEvent
}
