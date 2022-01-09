export interface HarmonyResponse {
  jsonrpc: '2.0';
  id: number;
  result: any;
}

export interface HarmonyRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: 1;
}

export type HarmonyErrorResponse = {
  jsonrpc: '2.0';
  id: 1;
  error: {
    code: number;
    message: string;
  };
};

export interface HarmonySimpleCallRequest extends HarmonyRequest {
  method: 'hmyv2_call';
  params: [{ to: string; data: string }, 'latest'];
}

export interface HarmonySimpleCallResponse extends HarmonyResponse {
  result: string;
}

export interface HarmonyTokenDecimalResponse extends HarmonyResponse {
  result: number;
}

export interface GetTransactionHistoryRequest extends HarmonyRequest {
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

export interface GetTransactionReceiptRequest extends HarmonyRequest {
  method: 'hmyv2_getTransactionReceipt';
  params: string[];
}
