import axios from "axios";

export interface GasConfig {
  debug?: boolean;
  hide?: boolean;
  hardcodedGwei?: number;
  gasBoostPrice?: number;
  pollTime?: number;
  network?: string;
}

export const defaultGasConfig: GasConfig = {
  debug: false,
  gasBoostPrice: 0.05,
  hardcodedGwei: 0,
  hide: true,
  network: "mainnet",
  pollTime: 31000
};

export class Gas {
  public readonly config: GasConfig = {};
  public gwei!: number;

  public constructor(_config?: GasConfig) {
    this.config = { ...defaultGasConfig, ..._config };
  }

  public async checkGasPrices() {
    if (this.config.network!.toLowerCase() === "xdai") {
      return 1.010101;
    } else if (this.config.network!.toLowerCase() === "mainnet") {
      if (!this.config.hardcodedGwei) {
        const response = await axios.get(
          "https://ethgasstation.info/json/ethgasAPI.json"
        );
        if (
          response &&
          response.data.average > 0 &&
          response.data.average < 200
        ) {
          const setMainGasTo =
            response.data.average +
            response.data.average * this.config.gasBoostPrice!;
          this.gwei = Math.round(setMainGasTo * 100) / 1000;
          return this.gwei;
        } else {
          throw new Error("Unknown response from ethgasstation");
        }
      } else {
        console.log("hardcoded");
        this.gwei = this.config.hardcodedGwei;
        return this.gwei;
      }
    } else {
      return 4.1;
    }
  }
}
