import HarmonyApiBase from './mixins/harmony-api-base';
import HarmonyTransactionApi from './mixins/harmony-transaction-api';
import HarmonyWalletApi from './mixins/harmony-wallet-api';

/**
 * The mixins pattern allows us to mimic multiple inheritance. HarmonyTokenApi,
 * HarmonyTransactionApi, and HarmonyWalletApi all essentially extend the
 * HarmonyApiBase base class. This gives us the ability to have one class
 * for all Harmony operations while organizing them in different classes logically.
 */
const HarmonyApi = HarmonyTransactionApi(HarmonyWalletApi(HarmonyApiBase));

// Harmony Api is a class in this case
export default HarmonyApi;
