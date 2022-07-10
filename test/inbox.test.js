const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3Instance = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // Get a lists of all accounts
  accounts = await web3Instance.eth.getAccounts();

  // Use one of the accounts to deploy the contract
  inbox = await new web3Instance.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ["Hello there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  // it("deploys a contract", () => {
  //   assert.ok(inbox.options.address);
  // });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("new message").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "new message");
  });
});
