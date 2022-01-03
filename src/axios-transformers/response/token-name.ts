import { HEX_PREFIX, HEX_ZERO } from '../../constants/constants';
import { hexToUtf8, removeUnicodeCharacters } from '../../utils/bech32-coding';
import { checkForHarmonyErrorWrapper } from '../error-handlers';

/**
 * Transforms token name/symbol data to human-readable string from hex encoding
 * before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Human readable token name/symbol
 */
const parseTokenName = (harmonyResponse: string): HarmonySimpleCallResponse => {
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

export default checkForHarmonyErrorWrapper(parseTokenName);
