export interface SignerConfig {
  debug?: boolean;
  web3: any;
}

export const defaultSignerConfig: SignerConfig = {
  debug: false,
  web3: false
};

export class Signer {
  public readonly config: SignerConfig = { web3: false };
  public readonly web3: any;

  public constructor(_config?: SignerConfig) {
    this.config = { ...defaultSignerConfig, ..._config };
    this.web3 = this.config.web3;
  }

  public async sign(message: string, account: string) {
    return await this.web3.eth.sign(message, account);
  }

  public async recover(message: string, sig: string) {
    return await this.web3.eth.accounts.recover(message, sig);
  }
}
