## HarmonyTransaction
* **transactions** [Array\<HarmonyTransaction\>]
  * ethHash: string --
  * from: string -- Harmony One address that initiated the transaction.
  * shardID: number;
  * to: string -- Harmony One address that receives the transaction data.
  * gas: number -- Gas provided by the sender.
  * gasPrice: number -- Gas price provided by the sender.
  * hash: string -- Transaction Hash that uniquely identifies the transaction.
  * input: string -- The encoded data sent along with the transaction.
  * nonce: number;
  * timestamp: number -- Epoch timestamp of transaction initiated.
  * toShardID: number;
  * value: number -- Amount of ATTO sent/received.
* **pagination** [bool] -- Indicates whether there are more transactions on the

## WrappedTransasctionReceipt
  * contractAddress: string;
  * cumulativeGasUsed: number;
  * from: string;
  * gasUsed: number;
  * status: number;
  * to: string;
  * transactionHash: string;
  * transactions: [SubTransaction](#subtransaction)[];

## SubTransaction
  transactionType: 'APPROVAL' | 'DEPOSIT' | 'LOCK' | 'SYNC' | 'SWAP' | 'TRANSFER';
  ethAddress?: string;
  oneAddress?: string;
  fromEthAddress: string;
  fromOneAddress: string;
  toEthAddress: string;
  toOneAddress: string;
}
