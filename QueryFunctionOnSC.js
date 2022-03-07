const Web3 = require('web3'); 
const rpc = 'https://rpc.syscoin.org'
const fs = require("fs");
const path = require("path");
const web3 = new Web3(rpc);
const CONTRACT_ADDRESS = "0x2CDF912CbeaF76d67feaDC994D889c2F4442b300";
const PegasysRouter = require("../artifacts/contracts/flatten/PegasysRouterFlatten.sol/PegasysRouter.json");


async function eventQuery(){

const contract = new web3.eth.Contract(PegasysRouter.abi, CONTRACT_ADDRESS);
contract.getPastEvents("allEvents",
    {                               
        fromBlock: 40400,     
        toBlock: 49000 // You can also specify 'latest'          
    })                              
.then((events) => {
    console.log("Found " + events.length + " events");

    // save users as json to file
    fs.writeFileSync(
      path.join(__dirname, "./Router.json"),
      JSON.stringify(events, null, 2)
    );})
.catch((err) => console.error(err));  
}

eventQuery();
