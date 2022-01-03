import responseTransforms from '../axios-transformers/response';
import { HarmonyApiBaseType } from './harmony-api-base';

const { transformTransactionHistoryResponse } = responseTransforms;

/**
 * Define Harmony Transaction Api mixin that extends the Harmony Base class.
 * TypeScript does not support multiple inheritance, we'll use
 * mixins instead.
 *
 * @param Base Base class the is extended by mixin
 * @returns Mixin class used to extend HarmonyApiBase
 */
function HarmonyTransactionApi<TBase extends HarmonyApiBaseType>(Base: TBase) {
  /**
   * Handles Harmony Transaction related data requests
   *
   * @extends HarmonyApiBase
   */
  class HarmonyTransactionApi extends Base {
    /**
     *  Returns transaction history for all Harmony Transactions in a wallet.
     *
     * TODO: add options for request config
     *
     * @param walletId Harmony wallet address
     * @param pageSize TODO: make this stricter to prevent pagination issues (changing between calls)
     * @param pageNumber Page number if pagination is required
     */
    getTransactionHistory = async (
      walletId: string,
      pageSize = 100,
      pageNumber = 0
    ): Promise<HarmonyTransactionHistory> => {
      const transactionHistoryRequestBody: GetTransactionHistoryRequest = {
        jsonrpc: '2.0',
        method: 'hmyv2_getTransactionsHistory',
        params: [
          {
            address: walletId,
            pageIndex: pageNumber,
            pageSize: pageSize,
            fullTx: true,
            txType: 'ALL',
            order: 'ASC',
          },
        ],
        id: 1,
      };

      const transactionHistory: AxiosTransactionHistoryResponse =
        await this._harmonyApi.request({
          method: 'POST',
          data: transactionHistoryRequestBody,
          transformResponse: (httpData: string) => {
            return transformTransactionHistoryResponse(httpData, pageSize);
          },
        });

      return transactionHistory.data;
    };

    /**
     * Returns the transaction details for a given transaction hash.
     *
     * @param transactionHash
     */
    getTransactionReceipt = async (
      transactionHash: string
    ): Promise<HarmonyTransactionReceipt> => {
      const transactionReceiptRequestBody: GetTransactionReceiptRequest = {
        jsonrpc: '2.0',
        method: 'hmyv2_getTransactionReceipt',
        params: [transactionHash],
        id: 1,
      };

      const rawTransactionReceipt: AxiosTransactionReceiptResponse =
        await this._harmonyApi.request({
          method: 'POST',
          data: transactionReceiptRequestBody,
        });

      return rawTransactionReceipt.data.result;
    };
  }

  return HarmonyTransactionApi;
}

export default HarmonyTransactionApi;
