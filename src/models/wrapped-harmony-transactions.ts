import { HarmonyTransaction } from './harmony-api.transaction';
import { SubTransaction } from './harmony-api.sub-transactions';

export type WrappedTransasctionReceipt = {
  contractAddress: string;
  cumulativeGasUsed: number;
  from: string;
  gasUsed: number;
  status: number;
  to: string;
  transactionHash: string;
  transactions: SubTransaction[];
};

export type HarmonyTransactionHistory = {
  transactions: HarmonyTransaction[];
  pagination: boolean;
};
