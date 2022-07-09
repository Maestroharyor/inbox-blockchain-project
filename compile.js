const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Get contract
const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// console.log(JSON.stringify(source));

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
// console.log(source);
console.log(solc.compile(JSON.stringify(input)));
