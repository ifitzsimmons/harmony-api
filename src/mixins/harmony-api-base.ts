import axios, { AxiosInstance } from 'axios';
import { checkForHarmonyError } from '../axios-transformers/error-handlers';

/** Encoding for simple call methods */
export enum HarmonySimpleCallMethod {
  GET_TOKEN_DECIMAL = '0x313ce567',
  GET_TOKEN_NAME = '0x06fdde03',
  GET_TOKEN_SYMBOL = '0x95d89b41',
}

export type SimpleCallParams = {
  to: string;
  data: HarmonySimpleCallMethod;
};

class HarmonyApiBase {
  /** Harmony URL endpoint */
  readonly _harmonyBaseUrl = 'https://api.harmony.one/';

  /** Axios instance used to request data from harmony */
  readonly _harmonyApi: AxiosInstance;

  constructor() {
    this._harmonyApi = axios.create({
      baseURL: this._harmonyBaseUrl,
    });

    this._harmonyApi.interceptors.response.use(checkForHarmonyError);
  }

  /**
   * Returns request parameters for Harmony Simple Call endpoint
   */
  getSimpleCallRequest = (params: SimpleCallParams): HarmonySimpleCallRequest => {
    return {
      jsonrpc: '2.0',
      method: 'hmyv2_call',
      params: [params, 'latest'],
      id: 1,
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type GConstructor<T = {}> = new (...args: any[]) => T;
export type HarmonyApiBaseType = GConstructor<HarmonyApiBase>;
export default HarmonyApiBase;
