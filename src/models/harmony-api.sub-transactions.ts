import { TokenMapValues } from './token';

export type TransactionApproval = 'APPROVAL';
export type TransactionDeposit = 'DEPOSIT';
export type TransactionLock = 'LOCK';
export type TransactionSwap = 'SWAP';
export type TransactionSync = 'SYNC';
export type TransactionTransfer = 'TRANSFER';

export type TransactionSimple = TransactionSync | TransactionLock;
export type DualPartyTransactionType = TransactionSwap | TransactionTransfer;
export type SinglePartyTransactionType = TransactionApproval | TransactionDeposit;
export type TransactionType =
  | DualPartyTransactionType
  | SinglePartyTransactionType
  | TransactionSimple;

export type RawTransactionApproval =
  '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
export type RawTransactionDeposit =
  '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c';
export type RawTransactionLock =
  '0x625fed9875dada8643f2418b838ae0bc78d9a148a18eee4ee1979ff0f3f5d427';
export type RawTransactionSwap =
  '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1';
export type RawTransactionSync =
  '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
export type RawTransactionTransfer =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export type RawTransactionType =
  | RawTransactionApproval
  | RawTransactionDeposit
  | RawTransactionLock
  | RawTransactionSwap
  | RawTransactionSync
  | RawTransactionTransfer;

export interface SubTransaction extends TransactionTopic, TokenMapValues {}

export interface TransactionTopic {
  readonly transactionType: TransactionType;
}

export interface SinglePartyTransaction extends TransactionTopic {
  readonly transactionType: SinglePartyTransactionType;
  readonly ethAddress: string;
  readonly oneAddress: string;
}

/**
 * Two Party means that there is a receiver and sender for a given transaction
 *
 * @attribute fromEthAddress: bech32 formatted wallet address of the sender
 * @attribute fromOneAddress: Harmony One wallet address of the sender
 * @attribute toEthAddress: bech32 formatted wallet address of the receiver
 * @attribute toOneAddress: Harmony One wallet address of the receiver
 */
export interface DualPartyTransaction extends TransactionTopic {
  readonly transactionType: DualPartyTransactionType;
  readonly fromEthAddress: string;
  readonly fromOneAddress: string;
  readonly toEthAddress: string;
  readonly toOneAddress: string;
}
