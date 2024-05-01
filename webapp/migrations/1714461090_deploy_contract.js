
const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(SimpleStorage);
};

