import { HarmonyApiBaseType, HarmonySimpleCallMethod } from './harmony-api-base';
import {
  parseTokenDecimal,
  parseTokenName,
} from '../axios-transformers/response-transformers';

/**
 * Define Harmony Token Api mixin that extends the Harmony Base class.
 * TypeScript does not support multiple inheritance, we'll use
 * mixins instead.
 *
 * @param Base
 * @returns Mixin class used to extend HarmonyApiBase
 */
function HarmonyTokenApiMixin<TBase extends HarmonyApiBaseType>(Base: TBase) {
  /**
   * This Token class defines the Harmony token related methods.
   *
   * @extends HarmonyApiBase
   */
  class HarmonyTokenApi extends Base {
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
      const tokenSymbolResponse = await this._harmonyApi.request({
        method: 'POST',
        data: request,
        transformResponse: parseTokenDecimal,
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
      const tokenSymbolResponse = await this._harmonyApi.request({
        method: 'POST',
        data: request,
        transformResponse: parseTokenName,
      });

      return tokenSymbolResponse.data;
    };
  }

  return HarmonyTokenApi;
}

export default HarmonyTokenApiMixin;
