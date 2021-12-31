import HarmonyApiBase, { HarmonySimpleCallMethod } from '../harmony-api-base';
import HarmonyTokenApiMixin from '../harmony-token-api';
import nock from 'nock';

const HarmonyTokenApi = HarmonyTokenApiMixin(HarmonyApiBase);
const harmonyTokenApi = new HarmonyTokenApi();

const xJewelToken = '0xa9ce83507d872c5e1273e745abcfda849daa654f';

describe('Harmony Token Wrapper', () => {
  describe('getTokenName', () => {
    const requestParams = {
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [
        { to: xJewelToken, data: HarmonySimpleCallMethod.GET_TOKEN_NAME },
        'latest',
      ],
      id: 1,
    };

    test('Decodes hex encoded token string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result:
          '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000007784a6577656c7300000000000000000000000000000000000000000000000000',
      });
      const axiosResponse = await harmonyTokenApi.getTokenName(xJewelToken);

      expect(axiosResponse).toEqual('xJewels');
    });

    test('returns null if result is 0x', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: '0x',
      });
      const axiosResponse = await harmonyTokenApi.getTokenName(xJewelToken);

      expect(axiosResponse).toEqual('');
    });

    test('raises error if result is not valid hex encoded string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: 'unicode',
      });

      try {
        await harmonyTokenApi.getTokenName(xJewelToken);
      } catch (e) {
        expect(e.message).toEqual('Invalid token address');
      }
    });
  });

  describe('getTokenDecimal', () => {
    const requestParams = {
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [
        { to: xJewelToken, data: HarmonySimpleCallMethod.GET_TOKEN_DECIMAL },
        'latest',
      ],
      id: 1,
    };

    test('Decodes hex encoded token string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: '0x0000000000000000000000000000000000000000000000000000000000000012',
      });
      const axiosResponse = await harmonyTokenApi.getTokenDecimal(xJewelToken);

      expect(axiosResponse).toEqual(18);
    });

    test('returns null if result is 0x', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: '0x',
      });
      const axiosResponse = await harmonyTokenApi.getTokenDecimal(xJewelToken);

      expect(axiosResponse).toEqual(0);
    });

    // Harmony returns 200 response even if error
    test.todo('Test error wrapping');
  });

  describe('getTokenSymbol', () => {
    const requestParams = {
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [
        { to: xJewelToken, data: HarmonySimpleCallMethod.GET_TOKEN_SYMBOL },
        'latest',
      ],
      id: 1,
    };

    test('Decodes hex encoded token string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result:
          '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000006784a4557454c0000000000000000000000000000000000000000000000000000',
      });
      const axiosResponse = await harmonyTokenApi.getTokenSymbol(xJewelToken);

      expect(axiosResponse).toEqual('xJEWEL');
    });

    test('returns null if result is 0x', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: '0x',
      });
      const axiosResponse = await harmonyTokenApi.getTokenSymbol(xJewelToken);

      expect(axiosResponse).toEqual('');
    });

    test('raises error if result is not valid hex encoded string', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one').post('/', requestParams).reply(200, {
        jsonrpc: '2.0',
        id: 1,
        result: 'unicode',
      });

      try {
        await harmonyTokenApi.getTokenSymbol(xJewelToken);
      } catch (e) {
        expect(e.message).toEqual('Invalid token address');
      }
    });

    // Harmony returns 200 response even if error
    test.todo('Test error wrapping');
  });
});
