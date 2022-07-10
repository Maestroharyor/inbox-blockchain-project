const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Get contract
const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// Compile
const compileOutput = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "inbox.sol"
]["Inbox"];

const interface = compileOutput.abi;
const bytecode = compileOutput.evm.bytecode.object;

module.exports = {
  interface,
  bytecode,
};
