export interface ContractLoaderConfig {
  debug?: boolean;
  web3: any;
}

export const defaultContractLoaderConfig: ContractLoaderConfig = {
  debug: false,
  web3: false
};

export class ContractLoader {
  public readonly config: ContractLoaderConfig = { web3: false };
  public readonly web3: any;

  public constructor(_config?: ContractLoaderConfig) {
    this.config = { ...defaultContractLoaderConfig, ..._config };
  }

  public load(abi: any, address: string, blockNumber?: number) {
    let abiObject = abi;
    if (typeof abiObject === "string") {
      abiObject = JSON.parse(abiObject);
    }
    const contract = new this.web3.eth.Contract(abiObject, address);
    const resultingContract = contract.methods;
    resultingContract._blocknumber = blockNumber;
    resultingContract._address = address;
    resultingContract._abi = abiObject;
    resultingContract._contract = contract;
    return resultingContract;
  }
}
