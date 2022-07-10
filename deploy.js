const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "dry endless mountain crack stereo inspire oven fetch sell throw try buzz",
  "https://rinkeby.infura.io/v3/80a4bdd74a0045c6a585812b87400928"
);

const web3Instance = new Web3(provider);

const deploy = async () => {
  // Get a lists of all accounts
  const accounts = await web3Instance.eth.getAccounts();

  console.log(`Attempting to deploy, ${accounts[0]}`);

  // Use one of the accounts to deploy the contract
  const result = await new web3Instance.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ["Hello there!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(`Contract deployed to ${result.options.address}`);
};

deploy();
