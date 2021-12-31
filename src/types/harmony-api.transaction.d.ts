interface HarmonyTransactionCommon {
  /** Hash of the block where the transaction occured. Null if pending */
  blockHash?: string;

  /** Number of the block where the transaction occured. Null if pending */
  blockNumber?: number;

  /** From address */
  from: string;

  shardID: number;

  /** To address */
  to: string;

  /** Transaction index in the block */
  transactionIndex: number;
}

interface HarmonyTransaction extends HarmonyTransactionCommon {
  ethHash: string;

  /** Gas provided by the sender */
  gas: number;

  /** Gas Price provided by the sender */
  gasPrice: number;

  /** Transaction hash */
  hash: string;

  /** The data sent along with the transaction */
  input: string;

  nonce: number;
  r: string;
  s: string;

  /** Epoch Seconds */
  timestamp: number;

  toShardID: number;

  v: string;

  /** Value transferred in ATTO */
  value: number;
}

interface HarmonyTransactionLog {
  /** Address from which log originated (20 Bytes) */
  address: string;
  /** Hash of the block where the transaction occured. Null if pending */
  blockHash: string;
  /** Number of the block where the transaction occured. Null if pending */
  blockNumber: string;

  /** Non-indexed arguments of the log */
  data: string;

  /** Log index position in the block */
  logIndex: string;

  /** True if log was removed due to chain reorganization */
  removed: boolean;

  /** 0-4 32 Bytes of indexed log arguments
   * First arg is HASH of signature of the event
   * Second topic is the action's FROM address
   * Third topic is the action's TO address
   */
  topics: string[];

  /** Transaction index in the block */
  transactionIndex: string;
  transactionHash: string;
}

interface HarmonyTransactionReceipt extends HarmonyTransactionCommon {
  contractAddress: string;

  /** Total amount of gas used when transaction was executed in Block */
  cumulativeGasUsed: number;
  /** Gas used by this specific transaction alone */
  gasUsed: number;
  logs: HarmonyTransactionLog[];
  logsBloom: string;
  root: string;
  status: number;

  transactionHash: string;
}

interface HarmonyGetTransactionHistoryData extends HarmonyResponse {
  result: {
    transactions: HarmonyTransaction[];
  };
}

interface HarmonyGetTransactionReceiptData extends HarmonyResponse {
  result: HarmonyTransactionReceipt;
}

interface HarmonyGetTransactionHistoryDataTransform {
  transactions: HarmonyTransaction[];
  pagination: boolean;
}
