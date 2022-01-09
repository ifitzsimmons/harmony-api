import { HEX_BASE_INT } from '../constants/hex-encoding';

/**
 * Returns human readable int for the token value being traded.
 *
 * @param encodedValue Hex encoded token value for transaction type
 */
export const getTokenValue = (encodedValue: string): number => {
  //TODO: handle error gracefully - this will fail all transactions!
  const hexData = encodedValue.slice(2);

  if (!hexData) {
    throw new Error(`Invalid Hex Address: ${encodedValue}`);
  }

  return parseInt(hexData, HEX_BASE_INT);
};
