import { checkForHarmonyErrorWrapper } from '../error-handlers';

/**
 * Transforms wallet balance from ATTO to ONE before fulfilling the promise.
 *
 * @param harmonyResponse The raw string response from the axios request.
 * @returns Converts balance to one
 */
const walletBalanceResponseTransform = (harmonyResponse: string): number => {
  const convertAttoToOne = (attoNumber: number): number => attoNumber / 1e18;

  const parsedResponse = JSON.parse(harmonyResponse);
  const attoBalance = parsedResponse.result;

  if (typeof attoBalance === 'string') {
    throw TypeError(`Harmony balance is not a number: "${attoBalance}"`);
  }

  const balance = convertAttoToOne(attoBalance);

  return balance;
};

export default checkForHarmonyErrorWrapper(walletBalanceResponseTransform);
