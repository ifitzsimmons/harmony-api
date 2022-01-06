import axios, { AxiosInstance } from 'axios';
import { checkForHarmonyError } from '../axios-transformers/error-handlers';
import responseTransforms from '../axios-transformers/response';

const { transformTokenDecimalResponse, transformTokenNameResponse } =
  responseTransforms;

/** Encoding for simple call methods */
export enum HarmonySimpleCallMethod {
  GET_TOKEN_DECIMAL = '0x313ce567',
  GET_TOKEN_NAME = '0x06fdde03',
  GET_TOKEN_SYMBOL = '0x95d89b41',
}

export type SimpleCallParams = {
  to: string;
  data: HarmonySimpleCallMethod;
};

class HarmonyApiBase {
  /** Harmony URL endpoint */
  readonly harmonyBaseUrl = 'https://api.harmony.one/';

  /** Axios instance used to request data from harmony */
  readonly harmonyApi: AxiosInstance;

  /** Maps token address ID to its human readable data (name, symbol, decimals) */
  _tokenMap: TokenMap = {};

  constructor() {
    this.harmonyApi = axios.create({
      baseURL: this.harmonyBaseUrl,
    });

    this.harmonyApi.interceptors.response.use(checkForHarmonyError);
  }

  /**
   * Retrieves the token name, symbol, and number of decimal places for
   * each token (as long as it doesn't already exist in the map of token
   * data). Each token in the transaction receipt has a unique identifier, or
   * address. We'll map this address to human readable data.
   *
   * @param tokenAddresses List of unique token addresses for every tokn in the list of
   *                       transactions.
   */
  getTokenData = async (tokenAddresses: TokenAddress[]): Promise<void> => {
    const tokenDataPromises = tokenAddresses.map(
      async (tokenAddress): Promise<TokenData | undefined> => {
        if (this._tokenMap[tokenAddress]) {
          return;
        }
        const tokenName = await this.getTokenName(tokenAddress);
        const tokenDecimal = await this.getTokenDecimal(tokenAddress);
        const tokenSymbol = await this.getTokenSymbol(tokenAddress);

        return { tokenAddress, tokenDecimal, tokenName, tokenSymbol };
      }
    );

    const tokenData = await Promise.all(tokenDataPromises);

    const tokenMap = tokenData
      .filter((token): token is TokenData => token !== undefined)
      .reduce((tokenMap, tokenData) => {
        const { tokenAddress, tokenDecimal, tokenName, tokenSymbol } = tokenData;
        tokenMap[tokenAddress] = { tokenDecimal, tokenName, tokenSymbol };
        return tokenMap;
      }, {} as TokenMap);

    this._setTokenMap(tokenMap);
  };

  /**
   * Get's the human readable decimal data for the token from the Harmony Api.
   * Converts from Hex to Number before returning response.
   *
   * @param tokenAddress - Unique address for token being traded
   */
  getTokenDecimal = async (tokenAddress: string): Promise<number> => {
    const harmonySimpleCallRequest = this.getSimpleCallRequest({
      data: HarmonySimpleCallMethod.GET_TOKEN_DECIMAL,
      to: tokenAddress,
    });

    const tokenDecimalResponse: HarmonyTokenDecimalResponse =
      await this._getTransformedTokenDecimal(harmonySimpleCallRequest);

    return tokenDecimalResponse.result;
  };

  /**
   * Get's the human-readable token name from the Harmony Api.
   * Converts from Hex to string before returning response.
   *
   * @param tokenAddress - Unique address for token being traded
   */
  getTokenName = async (tokenAddress: string): Promise<string> => {
    const harmonySimpleCallRequest = this.getSimpleCallRequest({
      data: HarmonySimpleCallMethod.GET_TOKEN_NAME,
      to: tokenAddress,
    });

    const tokenNameResponse: HarmonySimpleCallResponse =
      await this._getTransformedTokenString(harmonySimpleCallRequest);

    return tokenNameResponse.result;
  };

  /**
   * Get's the human-readable token symbol from the Harmony Api.
   * Converts from Hex to string before returning response.
   *
   * @param tokenAddress - Unique address for token being traded
   */
  getTokenSymbol = async (tokenAddress: string): Promise<string> => {
    const harmonySimpleCallRequest = this.getSimpleCallRequest({
      data: HarmonySimpleCallMethod.GET_TOKEN_SYMBOL,
      to: tokenAddress,
    });

    const tokenSymbolResponse: HarmonySimpleCallResponse =
      await this._getTransformedTokenString(harmonySimpleCallRequest);

    return tokenSymbolResponse.result;
  };

  /**
   * Defines a axios response transformation to transform Hex encoded
   * harmony response to a number and requests the data from the API.
   *
   * @param request Harmony request body for token decimal data
   * @returns Returns the decimal data
   */
  _getTransformedTokenDecimal = async (
    request: HarmonySimpleCallRequest
  ): Promise<HarmonyTokenDecimalResponse> => {
    const tokenSymbolResponse = await this.harmonyApi.request({
      method: 'POST',
      data: request,
      transformResponse: transformTokenDecimalResponse,
    });

    return tokenSymbolResponse.data;
  };

  /**
   * Defines a axios response transformation to transform Hex encoded
   * harmony response to a string and requests the data from the API.
   *
   * @param request Harmony request body for token name/symbol
   * @returns Returns the name/symbol data
   */
  _getTransformedTokenString = async (
    request: HarmonySimpleCallRequest
  ): Promise<HarmonySimpleCallResponse> => {
    const tokenSymbolResponse = await this.harmonyApi.request({
      method: 'POST',
      data: request,
      transformResponse: transformTokenNameResponse,
    });

    return tokenSymbolResponse.data;
  };

  /**
   * Returns request parameters for Harmony Simple Call endpoint
   */
  getSimpleCallRequest = (params: SimpleCallParams): HarmonySimpleCallRequest => {
    return {
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [params, 'latest'],
      id: 1,
    };
  };

  /**
   * Merges latest token mappings into old token mappings. If there is a collision,
   * the newest token mapping will take precedence.
   * @param tokenMap Map of token addresses to token data
   */
  _setTokenMap = (tokenMap: TokenMap): void => {
    // Redundant keys wil keep value being passed in.
    this._tokenMap = { ...this._tokenMap, ...tokenMap };
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type GConstructor<T = {}> = new (...args: any[]) => T;
export type HarmonyApiBaseType = GConstructor<HarmonyApiBase>;
export default HarmonyApiBase;
