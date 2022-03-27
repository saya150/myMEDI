const Nft = artifacts.require("nftRecord");

module.exports = function(deployer) {
  deployer.deploy(Nft);
};
