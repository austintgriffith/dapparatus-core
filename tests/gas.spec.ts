import { expect } from 'chai';
import 'mocha';

import { Gas, defaultConfig } from '../src/Gas';

describe('Loads config with defaults as fallbacks', () => {

  it('should load gas price from api within an acceptable range',async ()=>{
    let gas = new Gas()
    let gwei = await gas.checkGasPrices()
    console.log("\t\tgwei:",gwei)
    expect(gwei).to.be.below(100)
    expect(gwei).to.be.above(0.1)
  })

  /*it('should have default configuration', () => {
    let gas = new Gas()
    expect(gas.config.debug).to.equal(defaultConfig.debug)
    expect(gas.config.hide).to.be.true
    gas = new Gas({ hide: false })
    expect(gas.config.hide).to.be.false
  });*/

});