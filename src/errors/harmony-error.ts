/**
 * Error raised when Harmony API returns an error with a 200 Status Code
 *
 * @extends Error
 */
class HarmonyError extends Error {
  /** Status code from Harmony error object */
  private readonly statusCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    Object.setPrototypeOf(this, HarmonyError.prototype);

    this.statusCode = errorCode;
  }
}

export default HarmonyError;
