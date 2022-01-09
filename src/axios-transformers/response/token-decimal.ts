import { HEX_ZERO } from '../../constants/constants';
import {
  HarmonySimpleCallResponse,
  HarmonyTokenDecimalResponse,
} from '../../models/harmony-api';
import { checkForHarmonyErrorWrapper } from './../error-handlers';

/**
 * Transforms token decimal data to human-readable number from hex encoding
 * before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Human readable token decimal
 */
const parseTokenDecimal = (harmonyResponse: string): HarmonyTokenDecimalResponse => {
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

export default checkForHarmonyErrorWrapper(parseTokenDecimal);
