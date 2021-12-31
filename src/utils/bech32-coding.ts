import { HEX_BUFFER_TYPE } from '../constants/hex-encoding';

/**
 * @param from format of the string to convert
 * @param to format of conversion target
 * @param str string to convert
 * @returns Converted string
 */
const convert =
  (from, to) =>
  (str: string): string =>
    Buffer.from(str, from).toString(to);

/** Converts utf8 string to hex */
export const utf8ToHex = convert('utf8', HEX_BUFFER_TYPE);

/** Converts hex string to utf8 */
export const hexToUtf8 = convert(HEX_BUFFER_TYPE, 'utf8');

/**
 * Sometimes, there are unicode characters included when converting
 * hex encoded strings to utf8. This function removes all unicode
 * charactes from a string.
 *
 * @param utfString String in utf8 format
 * @returns string without any unicode characters.
 */
export const removeUnicodeCharacters = (utfString: string): string => {
  return utfString.replace(/[^ -~]+/g, '');
};
