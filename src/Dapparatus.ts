declare var require: any;

import { Gas } from "./Gas";
import { ContractLoader } from "./ContractLoader";
import { Signer } from "./Signer";

export interface DapparatusConfig {
  debug?: boolean;
  web3?: any;
  network?: string;
  providerUrl?: string;
}

export const defaultDapparatusConfig: DapparatusConfig = {
  debug: false,
  web3: false,
  network: "mainnet",
  providerUrl: undefined
};

export class Dapparatus {
  public readonly config: DapparatusConfig = {};
  public signer: Signer;
  public sign: (message: string, account: string) => void;
  public recover: (message: string, sig: string) => void;
  public web3: any;
  public accounts!: string[];
  public address!: string;

  public constructor(_config?: DapparatusConfig) {
    this.config = { ...defaultDapparatusConfig, ..._config };
    this.loadWeb3();
    this.signer = new Signer({web3: this.web3});
    this.sign = this.signer.sign;
    this.recover = this.signer.recover;
  }

  public async init() {
    this.accounts = await this.web3.eth.getAccounts()
    this.address = this.accounts[0];
  }

  public stop() {
    this.web3.currentProvider.stop();
  }

  private loadWeb3() {
    if (this.config.web3) {
      this.web3 = this.config.web3;
    } else {
      const Web3 = require("web3");
      const BurnerProvider = require("burner-provider");
      let providerUrl = this.config.providerUrl;
      if (!providerUrl) {
        switch (this.config.network!.toLowerCase()) {
          case "rinkeby":
            providerUrl = "https://rinkeby.infura.io";
            break;
          case "kovan":
            providerUrl = "https://kovan.infura.io";
            break;
          case "ropsten":
            providerUrl = "https://ropsten.infura.io";
            break;
          case "xdai":
            providerUrl = "https://dai.poa.network";
            break;
          case "localhost":
            providerUrl = "http://localhost:8545";
            break;
          default:
            providerUrl = "https://mainnet.infura.io";
        }
      }
      this.web3 = new Web3(new BurnerProvider(providerUrl));
    }
  }
}
