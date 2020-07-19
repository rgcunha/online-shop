import ApiError, { ApiErrorParameters } from "./ApiError";

export default class NotFoundError extends ApiError {
  constructor({ message = "Service error code = 404", cause }: ApiErrorParameters) {
    super({ message, cause });
  }
}
