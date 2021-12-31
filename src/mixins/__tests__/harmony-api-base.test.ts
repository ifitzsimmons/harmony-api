import HarmonyApiBase, { HarmonySimpleCallMethod } from '../harmony-api-base';

let harmonyBase: HarmonyApiBase;

describe('Test HarmonyApiBase class', () => {
  beforeEach(() => {
    harmonyBase = new HarmonyApiBase();
  });

  test('getSimpleCallRequest returns request body', () => {
    const requestParams = {
      to: 'to',
      data: HarmonySimpleCallMethod.GET_TOKEN_DECIMAL,
    };

    const request = harmonyBase.getSimpleCallRequest(requestParams);

    expect(request).toStrictEqual({
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [requestParams, 'latest'],
      id: 1,
    });
  });

  test('Harmony base URL is shard 0 URL', () => {
    expect(harmonyBase._harmonyBaseUrl).toBe('https://api.harmony.one/');
  });
});
