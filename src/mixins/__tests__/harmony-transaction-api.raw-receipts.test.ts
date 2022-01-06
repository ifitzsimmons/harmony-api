// Nock mock functions
import { mockTransactionReceipt } from './__utils__/nock/transaction-endpoints';
import { mockTokens } from './__utils__/nock/token-endpoints';
import HarmonyApiBase from '../harmony-api-base';
import HarmonyTransactionMixin from '../harmony-transaction-api';

import harmonyTransactionReceiptHttpResponse from './__data__/transactionReceipt/harmonyTransactionReceipt';
import harmonyTransactionReceiptHttpResponse2 from './__data__/transactionReceipt/harmonyTransactionReceipt2';
import nock from 'nock';
import HarmonyError from '../../errors/harmony-error';

const HarmonyTransactionApi = HarmonyTransactionMixin(HarmonyApiBase);
const harmonyTxnApi = new HarmonyTransactionApi();

describe('Harmony Transaction Wrapper', () => {
  beforeEach(mockTokens);
  afterEach(nock.cleanAll);

  const transactionHash1 =
    '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258';
  const request1 = {
    jsonrpc: '2.0',
    method: 'hmyv2_getTransactionReceipt',
    params: [transactionHash1],
    id: 1,
  };
  describe('getRawTransactionReceipt', () => {
    test('Returns raw transaction receipt', async () => {
      expect.assertions(1);

      mockTransactionReceipt(request1, 200, harmonyTransactionReceiptHttpResponse);
      const axiosResponse = await harmonyTxnApi.getRawTransactionReceipt(
        transactionHash1
      );

      expect(axiosResponse).toEqual(harmonyTransactionReceiptHttpResponse.result);
    });

    test('raises http error', async () => {
      expect.assertions(3);

      mockTransactionReceipt(request1, 200, {
        jsonrpc: '2.0',
        id: 1,
        error: {
          code: -32602,
          message: 'too many arguments, want at most 1',
        },
      });

      try {
        await harmonyTxnApi.getRawTransactionReceipt(transactionHash1);
      } catch (e) {
        expect(e.message).toEqual('too many arguments, want at most 1');
        expect(e.statusCode).toBe(-32602);
        expect(e).toBeInstanceOf(HarmonyError);
      }
    });
  });

  describe('getRawTransactionReceipts', () => {
    const transactionHash2 =
      '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64252';
    const request2 = {
      jsonrpc: '2.0',
      method: 'hmyv2_getTransactionReceipt',
      params: [transactionHash2],
      id: 1,
    };

    beforeEach(mockTokens);
    afterEach(nock.cleanAll);

    test('Returns raw transaction receipt', async () => {
      expect.assertions(1);

      mockTransactionReceipt(request1, 200, harmonyTransactionReceiptHttpResponse);
      mockTransactionReceipt(request2, 200, harmonyTransactionReceiptHttpResponse2);
      const axiosResponse = await harmonyTxnApi.getRawTransactionReceipts([
        transactionHash1,
        transactionHash2,
      ]);

      expect(axiosResponse).toEqual([
        harmonyTransactionReceiptHttpResponse.result,
        harmonyTransactionReceiptHttpResponse2.result,
      ]);
    });

    test('raises http error', async () => {
      expect.assertions(3);

      mockTransactionReceipt(request1, 200, harmonyTransactionReceiptHttpResponse2);
      mockTransactionReceipt(request2, 200, {
        jsonrpc: '2.0',
        id: 1,
        error: {
          code: -32602,
          message: 'too many arguments, want at most 1',
        },
      });

      try {
        await harmonyTxnApi.getRawTransactionReceipts([
          transactionHash1,
          transactionHash2,
        ]);
      } catch (e) {
        expect(e.message).toEqual('too many arguments, want at most 1');
        expect(e.statusCode).toBe(-32602);
        expect(e).toBeInstanceOf(HarmonyError);
      }
    });
  });
});
