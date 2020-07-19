import ApiError, { ApiErrorParameters } from "./ApiError";

export default class ServiceError extends ApiError {
  constructor({ message = "Service error code >= 500", cause }: ApiErrorParameters) {
    super({ message, cause });
  }
}
