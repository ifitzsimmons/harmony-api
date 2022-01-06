import nock from 'nock';
import { HarmonySimpleCallMethod } from '../../../harmony-api-base';
import {
  HARMONY_BASE_URL,
  jewelLpToken,
  jewelToken,
  wOneToken,
  wUstToken,
  xJewelToken,
} from './constants';

const getTokenDecimalRequest = (tokenAddress) => ({
  jsonrpc: '2.0',
  method: 'hmyv2_call',
  params: [
    { to: tokenAddress, data: HarmonySimpleCallMethod.GET_TOKEN_DECIMAL },
    'latest',
  ],
  id: 1,
});

const getTokenNameRequest = (tokenAddress) => ({
  jsonrpc: '2.0',
  method: 'hmyv2_call',
  params: [
    { to: tokenAddress, data: HarmonySimpleCallMethod.GET_TOKEN_NAME },
    'latest',
  ],
  id: 1,
});

const getTokenSymbolRequest = (tokenAddress) => ({
  jsonrpc: '2.0',
  method: 'hmyv2_call',
  params: [
    { to: tokenAddress, data: HarmonySimpleCallMethod.GET_TOKEN_SYMBOL },
    'latest',
  ],
  id: 1,
});

const simpleCallResponse = (data) => ({
  jsonrpc: '2.0',
  id: 1,
  result: data,
});

const mockXJewelTokenName = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenNameRequest(xJewelToken))
    .reply(
      200,
      simpleCallResponse(
        '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000007784a6577656c7300000000000000000000000000000000000000000000000000'
      )
    );
};

const mockXJewelTokenDecimal = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenDecimalRequest(xJewelToken))
    .reply(
      200,
      simpleCallResponse(
        '0x0000000000000000000000000000000000000000000000000000000000000012'
      )
    );
};

const mockJewelTokenSymbol = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenSymbolRequest(xJewelToken))
    .reply(
      200,
      simpleCallResponse(
        '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000006784a4557454c0000000000000000000000000000000000000000000000000000'
      )
    );
};

const mockJewelTokenName = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenNameRequest(jewelToken))
    .reply(
      200,
      simpleCallResponse(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000064a6577656c730000000000000000000000000000000000000000000000000000'
      )
    );
};

const mockJewelTokenDecimal = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenDecimalRequest(jewelToken))
    .reply(200, simpleCallResponse('0x'));
};

const mockXJewelTokenSymbol = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenSymbolRequest(jewelToken))
    .reply(
      200,
      simpleCallResponse(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000054a4557454c000000000000000000000000000000000000000000000000000000'
      )
    );
};

const mockJewelLpTokenName = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenNameRequest(jewelLpToken))
    .reply(
      200,
      simpleCallResponse(
        '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e4a6577656c204c5020546f6b656e000000000000000000000000000000000000'
      )
    );
};

const mockJewelLpTokenDecimal = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenDecimalRequest(jewelLpToken))
    .reply(200, simpleCallResponse('0x'));
};

const mockXJewelLpTokenSymbol = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenSymbolRequest(jewelLpToken))
    .reply(
      200,
      simpleCallResponse(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000084a4557454c2d4c50000000000000000000000000000000000000000000000000'
      )
    );
};

const mockWUstTokenName = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenNameRequest(wUstToken))
    .reply(
      200,
      simpleCallResponse(
        '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000011577261707065642055535420546f6b656e000000000000000000000000000000'
      )
    );
};

const mockWUstTokenDecimal = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenDecimalRequest(wUstToken))
    .reply(200, simpleCallResponse('0x'));
};

const mockWUstTokenSymbol = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenSymbolRequest(wUstToken))
    .reply(
      200,
      simpleCallResponse(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000035553540000000000000000000000000000000000000000000000000000000000'
      )
    );
};

const mockWOneTokenName = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenNameRequest(wOneToken))
    .reply(
      200,
      simpleCallResponse(
        '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b57726170706564204f4e45000000000000000000000000000000000000000000'
      )
    );
};

const mockWOneTokenDecimal = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenDecimalRequest(wOneToken))
    .reply(200, simpleCallResponse('0x'));
};

const mockWOneTokenSymbol = () => {
  nock(HARMONY_BASE_URL)
    .post('/', getTokenSymbolRequest(wOneToken))
    .reply(
      200,
      simpleCallResponse(
        '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004574f4e4500000000000000000000000000000000000000000000000000000000'
      )
    );
};

export const mockTokens = () => {
  mockXJewelTokenName();
  mockXJewelTokenDecimal();
  mockXJewelTokenSymbol();
  mockJewelTokenSymbol();
  mockJewelTokenName();
  mockJewelTokenDecimal();
  mockJewelLpTokenName();
  mockJewelLpTokenDecimal();
  mockXJewelLpTokenSymbol();
  mockWUstTokenName();
  mockWUstTokenDecimal();
  mockWUstTokenSymbol();
  mockWOneTokenName();
  mockWOneTokenDecimal();
  mockWOneTokenSymbol();
};
