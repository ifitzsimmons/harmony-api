// Nock mock functions
import { mockTokens } from './__utils__/nock/token-endpoints';
import HarmonyApiBase from '../harmony-api-base';
import HarmonyTransactionMixin from '../harmony-transaction-api';

import harmonyTransactionReceiptHttpResponse from './__data__/transactionReceipt/harmonyTransactionReceipt';
import harmonyTransactionReceiptAllTypes from './__data__/transactionReceipt/harmonyTransactionReceiptAllTypes';
import harmonyWrappedReceipt from './__data__/transactionReceipt/wrappedHarmonyTransaction';
import wrappedTransactionReceiptAllTypes from './__data__/transactionReceipt/wrappedTransationReceiptAllTypes';
import nock from 'nock';

const HarmonyTransactionApi = HarmonyTransactionMixin(HarmonyApiBase);
let harmonyTxnApi;

describe('Harmony Transaction Wrapper', () => {
  describe('getWrappedTransaction', () => {
    beforeEach(() => {
      harmonyTxnApi = new HarmonyTransactionApi();
      mockTokens();
    });
    afterEach(nock.cleanAll);

    test('Returns transformed transformed transaction receipt', async () => {
      expect.assertions(1);

      const wrappedTransaction = await harmonyTxnApi.getWrappedTransaction(
        harmonyTransactionReceiptHttpResponse.result
      );

      expect(wrappedTransaction).toEqual(harmonyWrappedReceipt);
    });

    test.todo('test tokens with bad responses');
  });

  describe('getWrappedTransactions', () => {
    beforeEach(mockTokens);
    afterEach(nock.cleanAll);

    test('Returns transformed transformed transaction receipt', async () => {
      expect.assertions(1);

      const wrappedTransactions = await harmonyTxnApi.getWrappedTransactions([
        harmonyTransactionReceiptHttpResponse.result,
        harmonyTransactionReceiptAllTypes.result,
      ]);

      expect(wrappedTransactions).toEqual([
        harmonyWrappedReceipt,
        wrappedTransactionReceiptAllTypes,
      ]);
    });
  });
});
