export interface TransactionsConfig {
  debug?: boolean;
}

export const defaultTransactionsConfig: TransactionsConfig = {
  debug: false,
};

export class Transactions {
  public readonly config: TransactionsConfig = {};

  public constructor(_config?: TransactionsConfig) {
    this.config = { ...defaultTransactionsConfig, ..._config };
  }

  public async tx(tx: any, maxGasLimit?: number, txData?: string, value?: number, callback?: (receipt: any) => void) {
    
  }
}
