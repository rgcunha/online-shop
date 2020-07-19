import ApiError, { ApiErrorParameters } from "./ApiError";

export default class BadRequestError extends ApiError {
  constructor({ message = "Service error code = 400", cause }: ApiErrorParameters) {
    super({ message, cause });
  }
}
