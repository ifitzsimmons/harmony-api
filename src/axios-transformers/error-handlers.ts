import { AxiosResponse } from 'axios';
import HarmonyError from '../errors/harmony-error';
import { HarmonyErrorResponse } from '../models/harmony-api';

/**
 * This checks the Harmony API response for the error property and throws an error.
 *
 * This method is used on all Harmony API responses, whether there's a response transform
 * or not.
 *
 * @param axiosResponse Response from the axios request.
 * @returns the response if no error detected.
 * @throws HarmonyError if Harmony API responds with an error
 */
export const checkForHarmonyError = (axiosResponse: AxiosResponse) => {
  if (axiosResponse.data?.hasOwnProperty('error')) {
    const { code, message } = (axiosResponse.data as HarmonyErrorResponse).error;

    throw new HarmonyError(message, code);
  }

  return axiosResponse;
};

/**
 * This function must wrap ALL response transforms to check for a HarmonyAPI error
 * before performing transformation.
 *
 * @param {Function} transformFunction function that transforms HTTP response
 * @param httpResponse Raw http response (JSON string) from the Harmony API that is
 *                     passed into transform response function
 * @param args Any extra arguments a transform function may need
 * @returns the transformed response if no error detected.
 * @throws HarmonyError if Harmony API responds with an error
 */
export const checkForHarmonyErrorWrapper =
  (transformFunction) =>
  (httpResponse: string, ...args) => {
    const data = JSON.parse(httpResponse);

    if (data.hasOwnProperty('error')) {
      const { code, message } = (data as HarmonyErrorResponse).error;

      throw new HarmonyError(message, code);
    }

    return transformFunction(httpResponse, ...args);
  };
