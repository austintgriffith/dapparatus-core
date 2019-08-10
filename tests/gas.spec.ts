import { expect } from "chai";
import "mocha";

import { Gas, defaultGasConfig } from "../src/Gas";

describe("Gas", () => {

  it("should have default configuration", () => {
    let gas = new Gas();
    expect(gas.config.debug).to.equal(defaultGasConfig.debug);
    expect(gas.config.hide).to.be.true;
    gas = new Gas({ hide: false });
    expect(gas.config.hide).to.be.false;
  });

  it("should load gas price from api within an acceptable range", async () => {
    const gas = new Gas();
    const gwei = await gas.checkGasPrices();
    console.log("\t\tgwei:", gwei);
    expect(gwei).to.be.below(100);
    expect(gwei).to.be.above(0.1);
  });

});
