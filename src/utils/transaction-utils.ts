import {
  DualPartyTransaction,
  DualPartyTransactionType,
  RawTransactionType,
  SinglePartyTransaction,
  SinglePartyTransactionType,
  TransactionSimple,
  TransactionTopic,
} from '../models/harmony-api.sub-transactions';
import { ethToOne, isHexAddress, isOneAddress, oneToEth } from './address-utils';

/**
 * Returns all Eth and One addresses for dual party transaction.
 *
 * @param fromAddress Entity sending data
 * @param toAddress Entity receiving data
 * @returns from and to addresses for Eth and One Wallets.
 */
const getFromAndToAddresses = (fromAddress: string, toAddress: string) => {
  const fromEthAddress = isHexAddress(fromAddress)
    ? fromAddress
    : oneToEth(fromAddress);
  const fromOneAddress = isOneAddress(fromAddress)
    ? fromAddress
    : ethToOne(fromAddress);
  const toEthAddress = isHexAddress(toAddress) ? toAddress : oneToEth(toAddress);
  const toOneAddress = isOneAddress(toAddress) ? toAddress : ethToOne(toAddress);

  return { fromEthAddress, fromOneAddress, toEthAddress, toOneAddress };
};

/**
 * Gets information for transactions that involve two parties, a sender and a receiver.
 *
 * @param transactionType Transfer or Swap for now
 * @returns addresses involved in the transaction.
 */
const dualPartyTransaction =
  (transactionType: DualPartyTransactionType) =>
  (topics: string[]): DualPartyTransaction | undefined => {
    try {
      const [fromAddress, toAddress] = topics;
      const fromAndToAddresses = getFromAndToAddresses(fromAddress, toAddress);
      return { ...fromAndToAddresses, transactionType };
    } catch (error) {
      console.error(`Error parsing ${transactionType}, ignoring`);
      console.error(topics);
    }
  };

/**
 * Gets information for transactions that involve one party.
 *
 * @param transactionType Approval or Deposit for now
 * @returns address involved in the transaction.
 */
const singlePartyTransaction =
  (transactionType: SinglePartyTransactionType) =>
  (topics: string[]): SinglePartyTransaction | undefined => {
    try {
      const [address] = topics;
      const ethAddress = isHexAddress(address) ? address : oneToEth(address);
      const oneAddress = isOneAddress(address) ? address : ethToOne(address);

      return { ethAddress, oneAddress, transactionType };
    } catch (error) {
      console.error(`Error parsing ${transactionType}, ignoring`);
      console.error(topics);
    }
  };

/**
 * Returns only the transaction type if there are no parties involved in the
 * transaction.
 *
 * @param transactionType Sync or Lock for now
 */
const simpleCallback = (transactionType: TransactionSimple) => (): TransactionTopic => {
  return { transactionType };
};

/**
 * Each transaction type is defined by a topic. The first topic in the list of topics
 * defines the transaction type. The other data in the list of topics is the hex encoded
 * data for the transaction participants.
 *
 * This map accepts the hex encoded transaction type and returns a function to parse
 * the topic data for the transaction.
 */
export const getTransactionTopicData: Record<
  RawTransactionType,
  (...args) => TransactionTopic | undefined
> = {
  '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925':
    singlePartyTransaction('APPROVAL'),
  '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c':
    singlePartyTransaction('DEPOSIT'),
  '0x625fed9875dada8643f2418b838ae0bc78d9a148a18eee4ee1979ff0f3f5d427':
    simpleCallback('LOCK'),
  '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1':
    simpleCallback('SYNC'),
  '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822':
    dualPartyTransaction('SWAP'),
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
    dualPartyTransaction('TRANSFER'),
};
