const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
  networks: { 
    rinkeby: {
      provider: () => new HDWalletProvider(`inquiry negative beach usage stable advance dinosaur human album inside explain cabin`, `https://rinkeby.infura.io/v3/26794b0125a74448afe527730d13f349`),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },  
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)      
    }
  }
};