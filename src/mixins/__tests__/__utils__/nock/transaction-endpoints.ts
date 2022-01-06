import nock from 'nock';
import { HARMONY_BASE_URL } from './constants';

export const mockTransactionHistory = (request, statusCode, response) => {
  nock(HARMONY_BASE_URL).post('/', request).reply(statusCode, response);
};

export const mockTransactionReceipt = (request, statusCode, response) => {
  nock(HARMONY_BASE_URL).post('/', request).reply(statusCode, response);
};
