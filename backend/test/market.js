const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");

describe("market", function () {
  async function deployContractFixture() {
    const [owner, others] = await ethers.getSigners();
    const mrkcontractFactory = await ethers.getContractFactory(
      "NFTMarketPlace"
    );
    const nftcontractFactory = await ethers.getContractFactory("MintNFT");
    const mrkcontract = await mrkcontractFactory.deploy();
    const nftcontract = await nftcontractFactory.deploy();
    return { nftcontract, mrkcontract, owner, others };
  }

  describe("createListing function", () => {
    it("should check for price", async () => {
      const { mrkcontract, owner, nftcontract, others } = await loadFixture(
        deployContractFixture
      );
      let tx1 = await nftcontract.connect(owner).setApprovalForAll(mrkcontract.address,true);
      await tx1.wait();
      await expect(
        mrkcontract.connect(owner).createListing(nftcontract.address, 2, 0)
      ).to.be.revertedWith("please provide a valid price for nft");
    });
  });
  it("should check for owner", async () => {
    const { mrkcontract, owner, nftcontract, others } = await loadFixture(
      deployContractFixture
    );
    await expect(
      mrkcontract.connect(others).createListing(nftcontract.address, 2, 1)
    ).to.be.revertedWith("you cannot list a nft which doesnot belongs to you");
  });
  it("check if it exist previously", async () => {
    const { mrkcontract, owner, nftcontract, others } = await loadFixture(
      deployContractFixture
    );
    let tx1 = await nftcontract.connect(owner).setApprovalForAll(mrkcontract.address,true);
    await tx1.wait();
    let tx = await mrkcontract
      .connect(owner)
      .createListing(nftcontract.address, 2, 2);
    await tx.wait();
    await expect(
      mrkcontract.connect(owner).createListing(nftcontract.address, 2, 1)
    ).to.be.revertedWith("nft already listed");
  });
  it("must set the price of the nft", async () => {
    const { mrkcontract, owner, nftcontract, others } = await loadFixture(
      deployContractFixture
    );
    let tx1 = await nftcontract.connect(owner).setApprovalForAll(mrkcontract.address,true);
    await tx1.wait();
    let tx = await mrkcontract
      .connect(owner)
      .createListing(nftcontract.address, 2, 2);
    await tx.wait();
     const listing = await  mrkcontract.connect(owner).listings(nftcontract.address,2);
     const price = listing.price;
     expect(price).to.equal(BigNumber.from(2));
  });
});
