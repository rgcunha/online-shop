import { AxiosError } from "axios";

export interface ApiErrorParameters {
  message?: string;
  cause: AxiosError;
}

export default class ApiError extends Error {
  private _cause: AxiosError;

  constructor({ message, cause }: ApiErrorParameters) {
    super(message);
    this.name = this.constructor.name;
    this._cause = cause;
  }

  get cause(): AxiosError {
    return this._cause;
  }
}
