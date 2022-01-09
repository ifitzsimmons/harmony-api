import responseTransforms from '../axios-transformers/response';
import {
  AxiosTransactionHistoryResponse,
  AxiosTransactionReceiptResponse,
} from '../models/axios-responses';
import {
  GetTransactionHistoryRequest,
  GetTransactionReceiptRequest,
} from '../models/harmony-api';
import { HarmonyTransactionReceipt } from '../models/harmony-api.transaction';
import { SubTransaction, TransactionTopic } from '../models/harmony-api.sub-transactions';
import { TokenAddress } from '../models/token';
import {
  HarmonyTransactionHistory,
  WrappedTransasctionReceipt,
} from '../models/wrapped-harmony-transactions';
import { setToList } from '../utils/set-to-list';
import { getTokenValue } from '../utils/token-utils';
import { getTransactionTopicData } from '../utils/transaction-utils';
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
        await this.harmonyApi.request({
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
    getRawTransactionReceipt = async (
      transactionHash: string
    ): Promise<HarmonyTransactionReceipt> => {
      const transactionReceiptRequestBody: GetTransactionReceiptRequest = {
        jsonrpc: '2.0',
        method: 'hmyv2_getTransactionReceipt',
        params: [transactionHash],
        id: 1,
      };

      const rawTransactionReceipt: AxiosTransactionReceiptResponse =
        await this.harmonyApi.request({
          method: 'POST',
          data: transactionReceiptRequestBody,
        });

      return rawTransactionReceipt.data.result;
    };

    /**
     * Returns transaction receipts for multiple transactions.
     *
     * @param transactionHash list of transaction hashes
     */
    getRawTransactionReceipts = async (
      transactionHashes: string[]
    ): Promise<HarmonyTransactionReceipt[]> => {
      const transactionReceiptRequests: GetTransactionReceiptRequest[] =
        transactionHashes.map((hash) => ({
          jsonrpc: '2.0',
          method: 'hmyv2_getTransactionReceipt',
          params: [hash],
          id: 1,
        }));

      const rawTransactionReceiptPromises: Promise<AxiosTransactionReceiptResponse>[] =
        transactionReceiptRequests.map(async (request) => {
          return await this.harmonyApi.request({
            method: 'POST',
            data: request,
          });
        });

      const rawReceipts = await Promise.all(rawTransactionReceiptPromises);

      return rawReceipts.map(({ data }) => data.result);
    };

    /**
     * Returns the wrapped transaction receipt with human readable data.
     * **NOTE** The preferred method returns a batch of wrapped transactions.
     *
     * @param rawReceipt Raw transaction receipt from getRawTransactionReceipt(s)
     * @returns
     */
    getWrappedTransaction = async (
      rawReceipt: HarmonyTransactionReceipt
    ): Promise<WrappedTransasctionReceipt> => {
      // 1. Get unique tokens across all transaction receipts
      const uniqueTokens = this._getUniqueTokensInTransactions([rawReceipt]);

      // 2. Get information for each token
      await this.getTokenData(uniqueTokens);

      // 3. Map transaction receipt data using the token data
      const transformedReceipt = this._wrapTransactionReceipt(rawReceipt);

      return transformedReceipt;
    };

    /**
     * Returns the wrapped transaction receipts with human readable data provided
     * a list of transaction receipts
     *
     * @param rawReceipts A list of raw transaction receipt from
     *                   getRawTransactionReceipt(s)
     */
    getWrappedTransactions = async (
      rawReceipts: HarmonyTransactionReceipt[]
    ): Promise<WrappedTransasctionReceipt[]> => {
      const uniqueTokens = this._getUniqueTokensInTransactions(rawReceipts);

      // Get token data for transformation
      await this.getTokenData(uniqueTokens);

      return rawReceipts.map(this._wrapTransactionReceipt);
    };

    /**
     * Returns unique list of Token types across all transaction receipts.
     * The list will be used to fetch data about the token type (name, symbol,
     * number of decimal places).
     *
     * @param rawTransactionsReceipts A list of raw transaction receipt from
     *                                getRawTransactionReceipt(s)
     */
    _getUniqueTokensInTransactions = (
      rawTransactionsReceipts: HarmonyTransactionReceipt[]
    ): TokenAddress[] => {
      const initialSet = new Set<string>();

      const uniqueTokens: Set<string> = rawTransactionsReceipts.reduce(
        (uniqueTokens, txnReceipt) => {
          const { logs } = txnReceipt;
          logs.forEach(({ address }) => {
            uniqueTokens.add(address);
          });

          return uniqueTokens;
        },
        initialSet
      );

      return setToList(uniqueTokens);
    };

    /**
     * Transforms a raw receipt into a human readable receipt. Decodes relevant
     * hex encoded data. Will only work after we have retrieved data for all of
     * the unique tokens in the list of transaction receipts.
     *
     * @param receipt Raw transaction receipt
     * @returns Wrapped/transformed transaction receipt with human readable data.
     */
    _wrapTransactionReceipt = (
      receipt: HarmonyTransactionReceipt
    ): WrappedTransasctionReceipt => {
      const {
        contractAddress,
        cumulativeGasUsed,
        from,
        gasUsed,
        logs,
        status,
        to,
        transactionHash,
      } = receipt;

      const subTransactions: SubTransaction[] = logs.map((log) => {
        const { address, data, topics } = log;

        const [topicCode, ...topicData] = topics;
        let transactionTypeData: TransactionTopic;

        try {
          transactionTypeData = getTransactionTopicData[topicCode](topicData);
        } catch (error) {
          if (error instanceof TypeError) {
            transactionTypeData = { transactionType: topicCode } as TransactionTopic;
          } else {
            throw error;
          }
        }

        const tokenValue = getTokenValue(data);
        const tokenData = this._tokenMap[address];

        return {
          ...transactionTypeData,
          ...tokenData,
          tokenValue,
        };
      });

      return {
        contractAddress,
        cumulativeGasUsed,
        from,
        gasUsed,
        status,
        to,
        transactionHash,
        transactions: subTransactions,
      };
    };
  }

  return HarmonyTransactionApi;
}

export default HarmonyTransactionApi;
