/* eslint-disable prettier/prettier */
declare class HarmonyApi {
  getBalance(walletId: string): Promise<number>;
  getTransactionHistory(walletId: string, pageNumber?: number): Promise<HarmonyTransactionHistory>;
  getTransactionReceipt(transactionHash: string): Promise<HarmonyGetTransactionReceiptData>;
  getTokenDecimal(tokenAddress: string): Promise<number>;
  getTokenName(tokenAddress: string): Promise<string>;
  getTokenSymbol(tokenAddress: string): Promise<string>;
}
