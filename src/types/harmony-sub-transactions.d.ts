type TransactionApproval = 'APPROVAL';
type TransactionDeposit = 'DEPOSIT';
type TransactionLock = 'LOCK';
type TransactionSwap = 'SWAP';
type TransactionSync = 'SYNC';
type TransactionTransfer = 'TRANSFER';

type TransactionSimple = TransactionSync | TransactionLock;
type DualPartyTransactionType = TransactionSwap | TransactionTransfer;
type SinglePartyTransactionType = TransactionApproval | TransactionDeposit;
type TransactionType =
  | DualPartyTransactionType
  | SinglePartyTransactionType
  | TransactionSimple;

type RawTransactionApproval =
  '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
type RawTransactionDeposit =
  '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c';
type RawTransactionLock =
  '0x625fed9875dada8643f2418b838ae0bc78d9a148a18eee4ee1979ff0f3f5d427';
type RawTransactionSwap =
  '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1';
type RawTransactionSync =
  '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
type RawTransactionTransfer =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

type RawTransactionType =
  | RawTransactionApproval
  | RawTransactionDeposit
  | RawTransactionLock
  | RawTransactionSwap
  | RawTransactionSync
  | RawTransactionTransfer;

interface SubTransaction extends TransactionTopic, TokenMapValues {}

interface TransactionTopic {
  readonly transactionType: TransactionType;
}

interface SinglePartyTransaction extends TransactionTopic {
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
interface DualPartyTransaction extends TransactionTopic {
  readonly transactionType: DualPartyTransactionType;
  readonly fromEthAddress: string;
  readonly fromOneAddress: string;
  readonly toEthAddress: string;
  readonly toOneAddress: string;
}
