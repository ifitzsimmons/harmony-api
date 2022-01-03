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
