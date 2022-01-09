import {
  HarmonyGetTransactionHistoryData,
  HarmonyGetTransactionHistoryDataTransform,
  HarmonyTransaction,
} from '../../models/harmony-api.transaction';
import { checkForHarmonyErrorWrapper } from '../error-handlers';

const REMOVE_KEYS = ['blockHash', 'blockNumber', 'r', 's', 'transactionIndex', 'v'];

/**
 * The transaction history api does not include an indication of whether
 * the response should be paginated or not. This function returns pagination
 * indicator that is set to true if the number of results is equal to the page limit,
 * false otherwise.
 *
 * @param response The raw string response from the axios request.
 * @param pageLimit Page limit defined for the request.
 * @returns Transactions with indication of pagination or not.
 */
const transactionHistoryTransform = (
  response: string,
  pageLimit: number
): HarmonyGetTransactionHistoryDataTransform => {
  const parsedResponse: HarmonyGetTransactionHistoryData = JSON.parse(response);
  const { transactions } = parsedResponse.result;

  if (!transactions || !Array.isArray(transactions)) {
    let msg = '"transactions" property missing from tranaction history response';

    if (transactions) {
      const transactionType = typeof transactions;
      msg = `Unexpected payload response, "transactions" is of type '${transactionType}'`;
    }

    throw TypeError(msg);
  }

  const transactionHistoryResponse = {
    pagination: false,
    transactions,
  };

  if (transactions.length === pageLimit) {
    transactionHistoryResponse.pagination = true;
  }

  transactionHistoryResponse.transactions.forEach((transaction: HarmonyTransaction) => {
    REMOVE_KEYS.forEach((key) => {
      delete transaction[key];
    });
  });

  return transactionHistoryResponse;
};

export default checkForHarmonyErrorWrapper(transactionHistoryTransform);
