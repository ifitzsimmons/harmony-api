import HarmonyApiBase from '../harmony-api-base';
import nock from 'nock';

import HarmonyTransactionMixin from '../harmony-transaction-api';

import harmonyTransactionsAxiosResponse from './__data__/transactionHistory';
import harmonyTransactionReceiptHttpResponse from './__data__/transactionReceipt';
import HarmonyError from '../../errors/harmony-error';

const HarmonyTransactionApi = HarmonyTransactionMixin(HarmonyApiBase);
const harmonyTxnApi = new HarmonyTransactionApi();

describe('Harmony Transaction Wrapper', () => {
  describe('getTransactionHistory', () => {
    const walletId = 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf';
    let baseParams;
    let baseRequest;

    beforeEach(() => {
      baseRequest = {
        jsonrpc: '2.0',
        method: 'hmyv2_getTransactionsHistory',
        params: [],
        id: 1,
      };

      baseParams = {
        address: walletId,
        pageIndex: 0,
        pageSize: 100,
        fullTx: true,
        txType: 'ALL',
        order: 'ASC',
      };
    });

    test('Returns transformed transactions without pagination', async () => {
      expect.assertions(1);

      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .reply(200, harmonyTransactionsAxiosResponse);
      const axiosResponse = await harmonyTxnApi.getTransactionHistory(walletId);

      expect(axiosResponse).toEqual({
        transactions: harmonyTransactionsAxiosResponse.result.transactions,
        pagination: false,
      });
    });

    test('Returns transformed transactions with pagination', async () => {
      expect.assertions(1);

      // Sets page size to number of returned transactions
      const pageSize = 2;
      baseParams.pageSize = pageSize;
      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .reply(200, harmonyTransactionsAxiosResponse);
      const axiosResponse = await harmonyTxnApi.getTransactionHistory(
        walletId,
        pageSize
      );

      expect(axiosResponse).toEqual({
        transactions: harmonyTransactionsAxiosResponse.result.transactions,
        pagination: true,
      });
    });

    test('Raises error if transactions not in response', async () => {
      expect.assertions(2);

      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .reply(200, { result: { transaction: [] } });

      try {
        await harmonyTxnApi.getTransactionHistory(walletId);
      } catch (e) {
        expect(e.message).toEqual(
          '"transactions" property missing from tranaction history response'
        );
        expect(e).toBeInstanceOf(TypeError);
      }
    });

    test('Raises error if transactions is not a list in axios response', async () => {
      expect.assertions(2);

      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .reply(200, { result: { transactions: { singular: 'transaction' } } });

      try {
        await harmonyTxnApi.getTransactionHistory(walletId);
      } catch (e) {
        expect(e.message).toEqual(
          'Unexpected payload response, "transactions" is of type \'object\''
        );
        expect(e).toBeInstanceOf(TypeError);
      }
    });

    test('Returns http error (bypasses transformation)', async () => {
      expect.assertions(1);

      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .replyWithError('something bad happened');

      try {
        await harmonyTxnApi.getTransactionHistory(walletId);
      } catch (e) {
        expect(e.message).toEqual('something bad happened');
      }
    });

    test('raises error http error', async () => {
      expect.assertions(3);

      baseRequest.params.push(baseParams);

      nock('https://api.harmony.one')
        .post('/', baseRequest)
        .reply(200, {
          jsonrpc: '2.0',
          id: 1,
          error: {
            code: -32602,
            message: 'invalid address: invalidAddress',
          },
        });

      try {
        await harmonyTxnApi.getTransactionHistory(walletId);
      } catch (e) {
        expect(e.message).toEqual('invalid address: invalidAddress');
        expect(e.statusCode).toBe(-32602);
        expect(e).toBeInstanceOf(HarmonyError);
      }
    });
  });

  describe('getTransactionReceipt', () => {
    const transactionHash =
      '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258';
    const request = {
      jsonrpc: '2.0',
      method: 'hmyv2_getTransactionReceipt',
      params: [transactionHash],
      id: 1,
    };

    test('Returns transformed transactions without pagination', async () => {
      expect.assertions(1);

      nock('https://api.harmony.one')
        .post('/', request)
        .reply(200, harmonyTransactionReceiptHttpResponse);
      const axiosResponse = await harmonyTxnApi.getTransactionReceipt(transactionHash);

      expect(axiosResponse).toEqual(harmonyTransactionReceiptHttpResponse.result);
    });

    test('raises error http error', async () => {
      expect.assertions(3);

      nock('https://api.harmony.one')
        .post('/', request)
        .reply(200, {
          jsonrpc: '2.0',
          id: 1,
          error: {
            code: -32602,
            message: 'too many arguments, want at most 1',
          },
        });

      try {
        await harmonyTxnApi.getTransactionReceipt(transactionHash);
      } catch (e) {
        expect(e.message).toEqual('too many arguments, want at most 1');
        expect(e.statusCode).toBe(-32602);
        expect(e).toBeInstanceOf(HarmonyError);
      }
    });
  });
});
