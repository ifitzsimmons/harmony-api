interface HarmonyResponse {
  jsonrpc: '2.0';
  id: number;
  result: any;
}

interface HarmonyRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: 1;
}

type HarmonyErrorResponse = {
  jsonrpc: '2.0';
  id: 1;
  error: {
    code: number;
    message: string;
  };
};

interface HarmonySimpleCallRequest extends HarmonyRequest {
  method: 'hmyv2_call';
  params: [{ to: string; data: string }, 'latest'];
}

interface HarmonySimpleCallResponse extends HarmonyResponse {
  result: string;
}

interface HarmonyTokenDecimalResponse extends HarmonyResponse {
  result: number;
}

interface GetTransactionHistoryRequest extends HarmonyRequest {
  method: 'hmyv2_getTransactionsHistory';
  params: [
    {
      address: string;
      pageIndex?: number;
      pageSize?: number;
      fullTx?: boolean;
      txType?: 'ALL' | 'RECEIVED' | 'SENT';
      order?: 'ASC' | 'DESC';
    }
  ];
}

interface GetTransactionReceiptRequest extends HarmonyRequest {
  method: 'hmyv2_getTransactionReceipt';
  params: string[];
}

interface HarmonyGetTransactionHistoryData extends HarmonyResponse {
  result: {
    transactions: HarmonyTransaction[];
  };
}

type HarmonyTransactionHistory = {
  transactions: HarmonyTransaction[];
  pagination: boolean;
};

interface HarmonyGetTransactionReceiptData extends HarmonyResponse {
  result: HarmonyTransactionReceipt;
}
