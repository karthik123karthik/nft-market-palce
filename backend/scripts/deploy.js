const { ethers } = require("hardhat");

async function main() {
  const MintNFTContractFactory = await ethers.getContractFactory("MintNFT");
  const MintNFTContract = await MintNFTContractFactory.deploy();
  await MintNFTContract.deployed();
  console.log("MintNFT contract address : ", MintNFTContract.address);
  const NFTMarketPlaceFactory = await ethers.getContractFactory(
    "NFTMarketPlace"
  );
  const MarketContract = await NFTMarketPlaceFactory.deploy();
  console.log("market address : ", MarketContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
