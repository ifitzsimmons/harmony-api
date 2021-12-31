import { HEX_PREFIX, HEX_ZERO } from '../constants/constants';
import { hexToUtf8, removeUnicodeCharacters } from '../utils/bech32-coding';

/**
 * Transforms token decimal data to human-readable number from hex encoding
 * before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Human readable token decimal
 */
export const parseTokenDecimal = (
  harmonyResponse: string
): HarmonyTokenDecimalResponse => {
  const response: HarmonySimpleCallResponse = JSON.parse(harmonyResponse);
  const encodedTokenDecimal = response.result;

  const decimalResponse: HarmonyTokenDecimalResponse = { ...response, result: 0 };

  if (encodedTokenDecimal === HEX_ZERO) {
    return decimalResponse;
  }

  // Remove '0x' prefix to get hex encoded number -- TODO: verify it starts with 0x
  const hexEncodedNumber = encodedTokenDecimal.slice(2);
  decimalResponse.result = parseInt(hexEncodedNumber, 16);

  return decimalResponse;
};

/**
 * Transforms token name/symbol data to human-readable string from hex encoding
 * before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Human readable token name/symbol
 */
export const parseTokenName = (harmonyResponse: string): HarmonySimpleCallResponse => {
  const response: HarmonySimpleCallResponse = JSON.parse(harmonyResponse);
  const encodedTokenName = response.result;

  if (!encodedTokenName.startsWith(HEX_PREFIX)) {
    throw new Error('Invalid token address');
  } else if (encodedTokenName === HEX_ZERO) {
    response.result = '';
    return response;
  }

  const strippedResult = encodedTokenName.slice(2);

  // Found in code, not found anywhere in documentation
  // there is an offset for the actual data in the encoded string
  // the offset is defined by the first 64 characters of the encoded string, multiplied by 2.
  const resultOffset = parseInt(strippedResult.slice(0, 64), 16) * 2;

  // The string data is the data from the offset to the end of the encoded string
  const data = strippedResult.slice(resultOffset);
  response.result = removeUnicodeCharacters(hexToUtf8(data));
  // Remove all non-printable characters (unicode)
  return response;
};

/**
 * The transaction history api does not include an indication of whether
 * the response should be paginated or not. This function returns pagination
 * indicator that is set to true if the number of results is equal to the page limit,
 * false otherwise.
 *
 * @param pageLimit Page limit defined for the request.
 * @param response The raw string response from the axios request.
 * @returns Transactions with indication of pagination or not.
 */
export const transactionHistoryTransform =
  (pageLimit: number) =>
  (response: string): HarmonyGetTransactionHistoryDataTransform => {
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

    return transactionHistoryResponse;
  };

/**
 * Transforms wallet balance from ATTO to ONE before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Converts balance to one
 */
export const walletBalanceResponseTransform = (harmonyResponse: string): number => {
  const convertAttoToOne = (attoNumber: number): number => attoNumber / 1e18;

  const parsedResponse = JSON.parse(harmonyResponse);
  const attoBalance = parsedResponse.result;

  if (typeof attoBalance === 'string') {
    throw TypeError(`Harmony balance is not a number: "${attoBalance}"`);
  }

  const balance = convertAttoToOne(attoBalance);

  return balance;
};
