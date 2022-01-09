import { HarmonyRequest } from './harmony-api';

export interface GetWalletBalanceRequest extends HarmonyRequest {
  method: 'hmyv2_getBalance';
  params: [string];
}
