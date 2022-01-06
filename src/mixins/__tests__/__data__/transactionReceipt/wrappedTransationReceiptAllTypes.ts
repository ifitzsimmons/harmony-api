const wrappedReceipt: WrappedTransasctionReceipt = {
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
      fromEthAddress:
        '0x00000000000000000000000024ad62502d1c652cc7684081169d04896ac20f30',
      fromOneAddress: 'one1yjkky5pdr3jje3mggzq3d8gy394vyresl69pgt',
      toEthAddress:
        '0x00000000000000000000000061356c852632813f3d71d57559b06cdff70e538b',
      toOneAddress: 'one1vy6kepfxx2qn70t36464nvrvmlmsu5utj353zs',
      tokenDecimal: 0,
      tokenName: 'Wrapped ONE',
      tokenSymbol: 'WONE',
      tokenValue: 39000000000000000000,
      transactionType: 'TRANSFER',
    },
    {
      fromEthAddress:
        '0x00000000000000000000000061356c852632813f3d71d57559b06cdff70e538b',
      fromOneAddress: 'one1vy6kepfxx2qn70t36464nvrvmlmsu5utj353zs',
      toEthAddress:
        '0x0000000000000000000000005056e49ffc8793a8f47ac669ffdfb8c23640f5b8',
      toOneAddress: 'one12ptwf8lus7f63ar6ce5llhaccgmypadcxmyvnf',
      tokenDecimal: 0,
      tokenName: 'Wrapped UST Token',
      tokenSymbol: 'UST',
      tokenValue: 12344567691977495000,
      transactionType: 'TRANSFER',
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
    {
      tokenDecimal: 0,
      tokenName: 'Jewel LP Token',
      tokenSymbol: 'JEWEL-LP',
      tokenValue: 5.229045092677613e173,
      transactionType: 'unknown',
    },
  ],
};

export default wrappedReceipt;
