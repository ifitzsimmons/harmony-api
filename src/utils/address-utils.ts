import { bech32 } from 'bech32';
import { HEX_PREFIX, HEX_ZERO, ONE_PREFIX } from '../constants/constants';
import { HEX_BASE_INT, HEX_BUFFER_TYPE } from '../constants/hex-encoding';

/**
 * Determines whether or not an address is a hex-encoded address
 * by checking if it starts with '0x'
 *
 * @param address
 */
export const isHexAddress = (address: string): boolean =>
  address.startsWith(HEX_PREFIX);

/**
 * Determines whether or not an address is a Harmony One address
 * by checking if it starts with 'one'
 *
 * @param address
 */
export const isOneAddress = (address: string): boolean =>
  address.startsWith(ONE_PREFIX);

/**
 * Converts hex encoded (bech32) address to Harmony One address
 * eth address prefix is "0x" + 24 "0"'s
 *
 * @param hexAddress  Hex encoded Eth address
 * @returns Harmony One address
 */
export const ethToOne = (hexAddress: string): string => {
  // eth address prefix is "0x" + 24 "0"'s
  // TODO
  // const addressPrefixPattern = /(?<=0x0*)[^0].*/;
  // const matcher = hexAddress.match(addressPrefixPattern);

  // Match everything after the first N number of 0's -- the address data
  const cleanHex = hexAddress.match(/(?<=0x0{24}).*/);

  if (!cleanHex || !cleanHex[0]) {
    return HEX_ZERO;
  }

  // const cleanHex = matcher[0];
  const bytes = Buffer.from(cleanHex[0], HEX_BUFFER_TYPE);
  const conv = bech32.toWords(bytes);

  return bech32.encode(ONE_PREFIX, conv);
};

/**
 * Converts Harmony One address to Hex encoded (bech32) address
 *
 * @param oneAddress Harmony One address
 * @returns Hex encoded (bech32) Eth address
 */
export const oneToEth = (oneAddress: string): string => {
  const decoded = bech32.decode(oneAddress);
  const byteArray = bech32.fromWords(decoded.words);

  // Returns the 40 char hex encoded address
  const address = byteArray
    .map((byte) => {
      return ('0' + (byte & 0xff).toString(HEX_BASE_INT)).slice(-2);
    })
    .join('');

  const addressPrefix = getEthAddressPrefix();
  return `${addressPrefix}${address}`;
};

/**
 * Bech32 Hex encoded Eth addresses are 66 characters long. The first two characters
 * are '0x', the next 64 are the address itself.
 *
 * The first 24 characters of the 64 character address are 0's. The
 * last 40 characters are the address.
 *
 * This function builds the address prefix (0x + 24 0's)
 */
export const getEthAddressPrefix = (): string => {
  let addressPrefix = '';
  for (let i = 0; i < 24; i++) {
    addressPrefix += '0';
  }

  return `${HEX_PREFIX}${addressPrefix}`;
};
