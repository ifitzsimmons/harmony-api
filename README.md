# Harmony API Wrapper

## Quick Links

| what          | where                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| documentation | [todo](todo)                                  |
| api-doc       | [todo](todo)        |
| npm package   | [todo](todo)                                  |
| source        | [https://github.com/ifitzsimmons/harmony-api.git](https://github.com/ifitzsimmons/harmony-api.git)                |
| Harmony API       | [Todo](Todo)                                                              |
| changelog     | [HISTORY.md](ToDo)                       |
| contributing  | [CONTRIBUTING.md](ToDo)             |

### Bugs / Feature Requests

Think you’ve found a bug? Want to see a new feature in `harmony-api`? Please open a
case in the github repo.

For now, this repository has one owner and contributor, so issues may take some time to resolve.

## Installation

The recommended way to get started using the Node.js 4.x driver is by using the `npm` (Node Package Manager) to install the dependency in your project.

After you've created your own project using `npm init`, you can run:

```bash
npm install harmony-api
# or ...
yarn add harmony-api
```

If you are a Typescript user, you will need the Node.js type definitions to use the package's definitions:

```sh
npm install -D @types/node
```

## Quick Start

After installing the package, you can add the following code to your file to use the Harmony API wrapper:
```typescript
import { HarmonyApi } from 'harmony-api';

const harmonyApi = new HarmonyApi();

const walletBalance = harmonyApi.getBalance('one12ptaf8lus7f63ar6ce5llhaccgmypadcxmyvnf')
```

### Get Wallet Balance

`getWalletBalance(walletAddress: string)`

The raw get balance request returns the balance in ATTO. The wrapper returns the balance in ONE ($ 1e18 $ ATTO = $ 1 $ ONE)

#### Request
* `walletAddress` - Harmony wallet address

#### Response
Harmony One wallet balance in units of ONE (**not Atto**).

#### Sample Usage
```typescript
const walletBalance = await harmonyApi.getBalance('one12ptaf8lus7f63ar6ce5llhaccgmypadcxmyvnf')

console.log(walletBalance);

/** logs
 * 54321
 */
```

### Get Wallet Transaction History

`getTransactionHistory(walletAddress: string, pageSize=100, pageNumber=0)`

Returns (paginated) transactions for the wallet.

#### Request
* `walletAddress` - Harmony wallet address.
* `pageSize` - Number of transactions to return, default is 100.
* `pageNumber` - Used for pagination. If the response has paginated transactions, increase the page number by 1. **NOTE: Do not change the page size between requests. Working on a solution for making page size readonly**).

#### Response
* **transactions** {[HarmonyTransaction](./docs/data-types.md#HarmonyTransaction)[]} List Transformed Harmony Transactions.
* **pagination** {`bool`} Indicates whether there are more transactions on the next page.



#### Sample Usage
```typescript
const transactionHistory = await harmonyApi
  .getTransactionHistory(
    'one12ptaf8lus7f63ar6ce5llhaccgmypadcxmyvnf'
    2
  )

console.log(transactionHistory);

/** logs
 * {
 *   transactions: [
       {
         ethHash: '0x69a097a66e1e6b93935e99dff2bf50566b4abc137a3c8fba08da33e2103a7399',
         from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
         gas: 79833,
         gasPrice: 10000000000,
         hash: '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
         input: '0xa59f3e0c000000000000000000000000000000000000000000000000058600624b30d939',
         nonce: 57,
         shardID: 0,
         timestamp: 1636648986,
         to: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
         toShardID: 0,
         value: 0,
       },
       {
         ethHash: '0xaea05f434a56c8c02e49a01ed445794a9a92d949d33d5984bcd975c5d64371cb',
         from: 'one1e5g4tvr576883myesdnmf4aek3fvt6gj6qesuu',
         gas: 50000,
         gasPrice: 50000000000,
         hash: '0xf1fa553b2993837fc1441d91a01a250e73b762906ec08744535a581034f1137e',
         input: '0x',
         nonce: 67902,
         shardID: 0,
         timestamp: 1635296314,
         to: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
         toShardID: 0,
         value: 59999000000000000000,
       },
     ],
     pagination: true
 * }
 */
```

### Get Transaction Receipt

`getRawransactionReceipt(transactionHash: string)`

Returns raw data for a particular transaction.

#### Request
* `transactionHash` - Harmony transaction hash.

#### Response
* **transactions** {[HarmonyTransactionReceipt](./docs/data-types.md#HarmonyTransactionReceipt)} Transformed transaction details.



#### Sample Usage
```typescript
const transactionReceipt = await harmonyApi
  .getTransactionReceipt(
    '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258'
  )

console.log(transactionReceipt);

/** logs
  {
    blockHash: '0x36039df946b0abfaa8b49f9c7b4a60f82a76958f22a00ae6aad5fa5d47f6d922',
    blockNumber: 19327155,
    contractAddress: '0x0000000000000000000000000000000000000000',
    cumulativeGasUsed: 3921936,
    from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
    gasUsed: 57192,
    logs: [
      {
        address: '0xa9ce83507d872c5e1273e745abcfda849daa654f',
        blockHash: '0x36039df946b0abfaa8b49f9c7b4a60f82a76958f22a00ae6aad5fa5d47f6d922',
        blockNumber: '0x126e8b3',
        data: '0x0000000000000000000000000000000000000000000000000383d396ee782c8f',
        logIndex: '0x43',
        removed: false,
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
        ],
        transactionHash:
          '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
        transactionIndex: '0xf',
      },
    ],
    logsBloom:
      '0x00000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000004000000000008000000000000010000000000000000000000000000000000820000000000010000100800000000000000000000000010000000000000000000000000008000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000102000000008000000000000000000000000000000000080000000020000018000000000000000000000400000000000000000000000000000000000000',
    root: '0x',
    shardID: 0,
    status: 1,
    to: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
    transactionHash: '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
    transactionIndex: 15,
  };
 */
```

### Get Transaction Receipts

`getRawTransactionReceipt(transactionHashes: string[])`

Returns raw data for a particular transaction.

#### Request
* `transactionHashes` - Harmony transaction hashes.

#### Response
* **transactions** {[HarmonyTransactionReceipt](./docs/data-types.md#HarmonyTransactionReceipt)[]} Transformed transaction details.



#### Sample Usage
```typescript
const transactionReceipts = await harmonyApi
  .getRawTransactionReceipts([
    '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
    '0x42e969171251e57598f5902eac0413991c8a821a98c70babe074ae801fdeb38f'
  ])

console.log(transactionReceipts);

/** logs
  [
    {
      blockHash: '0x36039df946b0abfaa8b49f9c7b4a60f82a76958f22a00ae6aad5fa5d47f6d922',
      blockNumber: 19327155,
      contractAddress: '0x0000000000000000000000000000000000000000',
      cumulativeGasUsed: 3921936,
      from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
      gasUsed: 57192,
      logs: [
        {
          address: '0xa9ce83507d872c5e1273e745abcfda849daa654f',
          blockHash: '0x36039df946b0abfaa8b49f9c7b4a60f82a76958f22a00ae6aad5fa5d47f6d922',
          blockNumber: '0x126e8b3',
          data: '0x0000000000000000000000000000000000000000000000000383d396ee782c8f',
          logIndex: '0x43',
          removed: false,
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
          ],
          transactionHash:
            '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
          transactionIndex: '0xf',
        },
      ],
      logsBloom:
        '0x00000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000004000000000008000000000000010000000000000000000000000000000000820000000000010000100800000000000000000000000010000000000000000000000000008000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000102000000008000000000000000000000000000000000080000000020000018000000000000000000000400000000000000000000000000000000000000',
      root: '0x',
      shardID: 0,
      status: 1,
      to: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
      transactionHash: '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
      transactionIndex: 15,
    },
    {
      blockHash: '0x36039df946b0abfaa8b49f9c7b4a60f82a76958f22a00ae6aad5fa5d47f6d922',
      blockNumber: 19327155,
      contractAddress: '0x0000000000000000000000000000000000000000',
      cumulativeGasUsed: 3921936,
      from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
      gasUsed: 57192,
      logs: [],
      logsBloom:
        '0x00000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000004000000000008000000000000010000000000000000000000000000000000820000000000010000100800000000000000000000000010000000000000000000000000008000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000102000000008000000000000000000000000000000000080000000020000018000000000000000000000400000000000000000000000000000000000000',
      root: '0x',
      shardID: 0,
      status: 1,
      to: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
      transactionHash: '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
      transactionIndex: 15,
    }
 */
```

### Get Wrapped Transaction Receipts

`getWrappedTransactions(transactions: HarmonyTransactionReceipt[])`

Wraps a list of transaction receipts and returns human readable data.

#### Request
* `transactions` {[HarmonyTransactionReceipt](./docs/data-types.md#HarmonyTransactionReceipt)[]} - A list of Raw transaction receipts

#### Response
* **transactions** {[WrappedTransasctionReceipt](./docs/data-types.md#wrappedtransasctionreceipt)[]} Transformed transaction details.



#### Sample Usage
```typescript
const transactionReceipts = await harmonyApi
  .getRawTransactionReceipts([
    '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
    '0x42e969171251e57598f5902eac0413991c8a821a98c70babe074ae801fdeb38f'
  ]);

const wrappedReceipts = await harmonyApi.
  getWrappedTransactions(transactionReceipts);

console.log(wrappedReceipts);

/** logs
  [
    {
      contractAddress: '0x0000000000000000000000000000000000000000',
      cumulativeGasUsed: 3921936,
      from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
      gasUsed: 57192,
      status: 1,
      to: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
      transactionHash: '0xcaa2536290b78bb5edca15d8db06cc29c323532f78e1da1b2a5833e0bbf64258',
      transactions: [
        {
          fromEthAddress: '0x0000000000000000000000000000000000000000000000000000000000000000',
          fromOneAddress: 'one1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqquzw7vz',
          toEthAddress: '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
          toOneAddress: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
          tokenDecimal: 18,
          tokenName: 'xJewels',
          tokenSymbol: 'xJEWEL',
          tokenValue: 253278649262288000,
          transactionType: 'TRANSFER',
        },
        {
          fromEthAddress: '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
          fromOneAddress: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
          toEthAddress: '0x000000000000000000000000a9ce83507d872c5e1273e745abcfda849daa654f',
          toOneAddress: 'one1488gx5rasuk9uynnuaz6hn76sjw65e206pmljg',
          tokenDecimal: 0,
          tokenName: 'Jewels',
          tokenSymbol: 'JEWEL',
          tokenValue: 398006039237155140,
          transactionType: 'TRANSFER',
        },
        {
          ethAddress: '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
          oneAddress: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
          tokenDecimal: 0,
          tokenName: 'Jewels',
          tokenSymbol: 'JEWEL',
          tokenValue: 1.157920892373162e77,
          transactionType: 'APPROVAL',
        },
      ],
    }
    {
      contractAddress: '0x0000000000000000000000000000000000000000',
      cumulativeGasUsed: 712891,
      from: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
      gasUsed: 109993,
      status: 1,
      to: 'one1yjkky5pdr3jje3mggzq3d8gy394vyresl69pgt',
      transactionHash: '0x42e969171251e57598f5902eac0413991c8a821a98c70babe074ae801fdeb38f',
      transactions: [
        {
          ethAddress: '0x00000000000000000000000024ad62502d1c652cc7684081169d04896ac20f30',
          oneAddress: 'one1yjkky5pdr3jje3mggzq3d8gy394vyresl69pgt',
          tokenDecimal: 0,
          tokenName: 'Wrapped ONE',
          tokenSymbol: 'WONE',
          tokenValue: 39000000000000000000,
          transactionType: 'DEPOSIT',
        },
        {
          tokenDecimal: 0,
          tokenName: 'Jewel LP Token',
          tokenSymbol: 'JEWEL-LP',
          tokenValue: 8.96875045756917e100,
          transactionType: 'SYNC',
        },
        {
          fromEthAddress:
            '0x00000000000000000000000024ad62502d1c652cc7684081169d04896ac20f30',
          fromOneAddress: 'one1yjkky5pdr3jje3mggzq3d8gy394vyresl69pgt',
          toEthAddress:
            '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
          toOneAddress: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
          tokenDecimal: 0,
          tokenName: 'Jewel LP Token',
          tokenSymbol: 'JEWEL-LP',
          tokenValue: 5.229045092677613e173,
          transactionType: 'SWAP',
        },
      ],
    }
  ]
*/
```

## Error Handling
ToDo

## To Do
1. Combine relevant fields from trnasaction history (transfer fee) and others with wrapped receipt
1. Reorganize pagination for transaction history
1. optimize token settings
1. More robust address utils/bech32 encoding. Find documentation for parsing data.
1. Fix husky
1. Add contributions file
1. Add pre-push script that will run tests
1. Add pipeline that will distribute package and test.
1. Build distribution package for ts and js
1. Auto API Doc creation (typedoc)
1. Figure out why I had to use babel and old versions of jest/ts-jest in order to run tests. This can be open sourced.
1. Force all response transform functions to be wrapped by error handler
1. Make page size readonly as to not mess with pagination, add a max.
1. Better named exports for response transformers
1. Enfore JSdocs are up-to-date with params
1. Transform transaction value from ATTO to ONE
    * transform `from` and `to` to `fromOneAddress` and `toOneAddress` and ensure they are ONE addresses
    * Make `ethHash`, `nonce`, `shardId`, and `toShardId` optional return values (add an arg)
1. Transform hex encoded numeric values in receipt
    * blockHash
    * blockNumber
    * transactionIndex
1. Implement optional logger
1. Cover missing test coverage
1. Add API docs
1. Add table of contents
1. Clean up type definitions in package
