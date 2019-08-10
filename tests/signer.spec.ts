declare var require: any;

import { expect } from "chai";
import "mocha";

import { Signer } from "../src/Signer";

describe("Signer", () => {
  before(function() {
    this.timeout(5000);
  });

  it("should sign and recover correctly", async () => {
    const Web3 = require("web3");
    const BurnerProvider = require("burner-provider");
    const web3 = new Web3(new BurnerProvider("https://mainnet.infura.io"));
    const accounts = await web3.eth.getAccounts();

    const signer = new Signer({web3});
    const sig = await signer.sign("Hello World", accounts[0]);

    console.log("\t\tsig:", sig);
    // expect(gwei).to.be.below(100);
    // expect(gwei).to.be.above(0.1);

    web3.currentProvider.stop();
  });

});
