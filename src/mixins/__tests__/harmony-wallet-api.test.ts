import HarmonyApiBase from '../harmony-api-base';
import nock from 'nock';

import HarmonyWalletMixin from '../harmony-wallet-api';

const HarmonyWalletApi = HarmonyWalletMixin(HarmonyApiBase);
const harmonyWalletApi = new HarmonyWalletApi();

describe('Harmony Wallet Wrapper', () => {
  describe('getBalance', () => {
    const walletId = 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf';
    const request = {
      jsonrpc: '2.0',
      method: 'hmyv2_getBalance',
      params: [walletId],
      id: 1,
    };

    test('Returns transformed transactions without pagination', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', request).reply(200, {
        jsonrpc: '2.0',
        id: '1',
        result: 5e21,
      });

      const balance = await harmonyWalletApi.getBalance(walletId);

      expect(balance).toEqual(5000);
    });

    test('Throws error if balance is a string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', request).reply(200, {
        jsonrpc: '2.0',
        id: '1',
        result: '5e21',
      });

      try {
        await harmonyWalletApi.getBalance(walletId);
      } catch (e) {
        expect(e.message).toBe('Harmony balance is not a number: "5e21"');
      }
    });

    // Harmony returns 200 response even if error
    test.todo('Test error wrapping');
  });
});
