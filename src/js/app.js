App = {
  loading: false,
  allblocks:[],
  contracts: {},  
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract1()
    //await App.loadContract2()
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
  loadContract1: async () => {
    // Create a JavaScript version of the smart contract
    const Sample = await $.getJSON('Land.json')
    App.contracts.Sample = TruffleContract(Sample)
    App.contracts.Sample.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.land = await App.contracts.Sample.deployed()
    App.listenForEvents();
  },
  loadContract2: async () => {
    // Create a JavaScript version of the smart contract
    // const Sample = await $.getJSON('Land.json')
    // App.contracts.Sample = TruffleContract(Sample)
    // App.contracts.Sample.setProvider(App.web3Provider)
    // // Hydrate the smart contract with values from the blockchain
    // App.land = await App.contracts.Sample.deployed()
    var abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "_approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_approved",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_uri",
            "type": "string"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "__tokenId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_uri",
            "type": "string"
          }
        ],
        "name": "purchase",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "_approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "newowner",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "NOT_CURRENT_OWNER",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "_interfaceID",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    // App.land= web3.eth.contract(abi, 0x7fA874A64b329c344eEE6945A89330843eF66D24);
    var SimpleStorageContract = web3.eth.contract(abi);

// Instanciate by address
App.land = SimpleStorageContract.at("0x7fA874A64b329c344eEE6945A89330843eF66D24");
console.log(App.land.address)


  },

  render: async () => {
    // $("#meta").html(App.account)
    // $("#showpage").show();
    //window.alert("loded")
   
  } ,
  listenForEvents: async function() {
    App.contracts.Sample.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.Transfer({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.allblocks.push(event); 
        App.render();
      });
    });
  },
  
listenForEvents333:async  function() {   
  
      var instance=await  App.contracts.Sample.deployed()
        instance.getPastEvents("Transfer", { fromBlock: 0 }).then((events) => {
          window.alert("previous event");
          App.allblocks.push(events);          
        });
        instance.contract.events.Transfer({
          filter: {}, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0,
          toBlock: 'latest'
      }, function(error, event){ console.log(event); 
      })
      .on('data', function(event){
          //console.log(event); // same results as the optional callback above
          //window.alert("event cPTURD");
          App.allblocks.push(event); 
      })
      .on('changed', function(event){
          // remove event from local database
          window.alert("event on Changed");
      })
      .on('error', console.error);
},


  mint :async ()=>{    
   // await App.load();
  //  Reading values of tokenId ,price and URL from the html
    var tokenid=parseInt($("#tokenid").val());
    var amount=$("#price").val();
    var amountinwei=amount*1000000000000000000;
    var url="https://erpsoftwares.in/NFT/datainsert/uploads/1.jpg"
    var sold=await App.land.purchased(tokenid);
    console.log(sold)
    if(sold){
      window.alert("This land already sold");
      return
    }
    await App.land.purchase(tokenid,url,{from:App.account,value:amountinwei});
  } ,
  history :async ()=>{    
    $("#displayhistory").empty();
     var tokenidhistory=parseInt($("#tokenidhistory").val());
     var p=0;
     for(var i=0;i<App.allblocks.length;i++){
      //console.log(App.allblocks[i].args.tokenId)
       if(parseInt(App.allblocks[i].args.tokenId)==tokenidhistory){
         p++;
         var str="<tr><td>"+p+"</td><td>"+tokenidhistory+"</td><td>"+App.allblocks[i].args.from+"</td><td>"+App.allblocks[i].args.to+"</td></tr>"
          $("#displayhistory").append(str)
       }
     }

   } 

}
$( document ).ready(function() {
  App.load();
});



