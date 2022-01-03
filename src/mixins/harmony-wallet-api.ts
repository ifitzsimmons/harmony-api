import responseTransforms from '../axios-transformers/response';
import { HarmonyApiBaseType } from './harmony-api-base';

const { transformWalletBalanceResponse } = responseTransforms;

/**
 * Define Harmony Wallet Api mixin that extends the Harmony Base class.
 * TypeScript does not support multiple inheritance, we'll use
 * mixins instead.
 *
 * @param Base
 * @returns Mixin class used to extend HarmonyApiBase
 */
function HarmonyWalletApi<TBase extends HarmonyApiBaseType>(Base: TBase) {
  /**
   * Handles/wraps Harmony API wallet-related requests
   *
   * @extends HarmonyApiBase
   */
  class HarmonyWalletApi extends Base {
    /**
     * Returns harmony wallet balance (unit = 'ONE')
     *
     * @param walletId Harmony wallet address
     */
    getBalance = async (walletId: string): Promise<number> => {
      const getWalletBalanceRequest: GetWalletBalanceRequest = {
        jsonrpc: '2.0',
        method: 'hmyv2_getBalance',
        params: [walletId],
        id: 1,
      };

      const walletBalance: AxiosWalletBalanceResponse = await this._harmonyApi.request({
        method: 'POST',
        data: getWalletBalanceRequest,
        transformResponse: transformWalletBalanceResponse,
      });

      return walletBalance.data;
    };
  }

  return HarmonyWalletApi;
}

export default HarmonyWalletApi;
