import axios from "axios"

export interface GasConfig {
    debug?: boolean
    hide?: boolean
    hardcodedGwei?: number
    gasBoostPrice?: number
    pollTime?: number
    network?: string
}

export const defaultConfig: GasConfig = {
    debug: false,
    hide: true,
    hardcodedGwei: 0,
    gasBoostPrice: 0.05,
    pollTime: 31000,
    network: "mainnet"
}

export class Gas {
    readonly config: GasConfig = {}
    //private pollInterval: number
    public gwei!: number

    public constructor(_config?: GasConfig) {
        this.config = { ...defaultConfig, ..._config }
        //this.pollInterval = setInterval(this.checkGasPrices, this.config.pollTime)
    }

    public async checkGasPrices() {
        if (this.config.network!.toLowerCase() == "mainnet") {
            if (!this.config.hardcodedGwei) {
                let response = await axios.get("https://ethgasstation.info/json/ethgasAPI.json")
                if (response && response.data.average > 0 && response.data.average < 200) {
                    let setMainGasTo = response.data.average + (response.data.average * this.config.gasBoostPrice!)
                    setMainGasTo = Math.round(setMainGasTo * 100) / 1000
                    return setMainGasTo
                } else {
                    throw ("Unknown response from ethgasstation")
                }
            } else {
                console.log("hardcoded")
                this.gwei = this.config.hardcodedGwei
                return this.gwei
            }
        }
    }
}