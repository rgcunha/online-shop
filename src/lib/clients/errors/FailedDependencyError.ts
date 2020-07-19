import ApiError, { ApiErrorParameters } from "./ApiError";

export default class FailedDependencyError extends ApiError {
  constructor({ message = "Service error code = 424", cause }: ApiErrorParameters) {
    super({ message, cause });
  }
}
