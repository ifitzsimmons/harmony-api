import { HarmonyErrorResponse } from './harmony-api';
import { HarmonyGetTransactionReceiptData } from './harmony-api.transaction';
import { HarmonyTransactionHistory } from './wrapped-harmony-transactions';

type AxiosTransactionHistoryResponse = {
  data: HarmonyTransactionHistory;
};

type AxiosTransactionReceiptResponse = {
  data: HarmonyGetTransactionReceiptData;
};

type AxiosWalletBalanceResponse = {
  data: number;
};

type AxiosHarmonyError = {
  data: HarmonyErrorResponse;
};
