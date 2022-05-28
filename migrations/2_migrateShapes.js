const Migrations = artifacts.require("Land.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};