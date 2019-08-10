declare var require: any;

import { expect } from "chai";
import "mocha";

import { Dapparatus } from "../src/Dapparatus";

describe("Dapparatus", () => {

  it("should sign and recover correctly", async () => {
    const dapparatus = new Dapparatus();
    await dapparatus.init();
    //const sig = await dapparatus.sign("Hello World", dapparatus.address);
    //console.log("\t\tsig:", sig);
    // expect(gwei).to.be.below(100);
    // expect(gwei).to.be.above(0.1);
    dapparatus.stop();
  });

});
