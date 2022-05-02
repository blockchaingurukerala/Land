App = {
  loading: false,
  contracts: {},  
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    //await App.loadContract1()
    await App.loadContract2()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    //window.alert(App.account);
   
  },
  // loadContract1: async () => {
  //   // Create a JavaScript version of the smart contract
  //   const Sample = await $.getJSON('PKT.json')
  //   App.contracts.Sample = TruffleContract(Sample)
  //   App.contracts.Sample.setProvider(App.web3Provider)
  //   // Hydrate the smart contract with values from the blockchain
  //   App.token = await App.contracts.Sample.deployed()
  // },
  loadContract2: async () => {
    // Create a JavaScript version of the smart contract
    const Sample = await $.getJSON('Shapes.json')
    App.contracts.Sample = TruffleContract(Sample)
    App.contracts.Sample.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.shapes = await App.contracts.Sample.deployed()
  },

  render: async () => {
    $("#meta").html(App.account)
    $("#showpage").show();
    console.log(App.shapes.address)
    
  } ,
  mint :async ()=>{    
   
    var amountinwei=0.1*1000000000000000000;
    //await App.token.transfer(App.crowd.address,amount,{from:App.account})
   
    await App.shapes.purchase({from:App.account,value:amountinwei});
  } ,
  checkBalace:async ()=>{
    var a=await App.bank.balance(App.account);
    //console.log(a)
    a=a/1000000000000000000;
    $("#disbalance").html(parseInt(a));
  },
  withdraw :async ()=>{
    await App.bank.withdraw({from:App.account});
  }

}



