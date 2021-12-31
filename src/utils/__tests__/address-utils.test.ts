import {
  ethToOne,
  getEthAddressPrefix,
  isHexAddress,
  isOneAddress,
  oneToEth,
} from '../address-utils';

describe('Harmony address utils', () => {
  const hexAddress =
    '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8';
  const oneAddress = 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf';

  test('isHexAddress', () => {
    expect(isHexAddress(hexAddress)).toBeTruthy();
    expect(isHexAddress(oneAddress)).toBeFalsy();
  });

  test('isOneAddress', () => {
    expect(isOneAddress(oneAddress)).toBeTruthy();
    expect(isOneAddress(hexAddress)).toBeFalsy();
  });

  test('ethToOne returns one address', () => {
    expect(ethToOne(hexAddress)).toBe(oneAddress);
  });

  test('ethToOne returns 0x', () => {
    expect(ethToOne('0xasdas0asd0asd')).toBe('0x');
    expect(ethToOne(oneAddress)).toBe('0x');
  });

  test('ethToOne returns one address', () => {
    expect(oneToEth(oneAddress)).toBe(hexAddress);
  });

  test('getEthAddressPrefix returns 0x + 24 0s', () => {
    const ethPrefix = getEthAddressPrefix();

    expect(ethPrefix).toMatch(/0x0{24}/);
  });

  test.todo('ethToOne throws error if address is invalid');

  test.todo('oneToEth fails if invalid oneAddress');
});
