import express from "express";
import HttpErrors from "http-errors";
import { inject, injectable } from "inversify";
import TYPES from "../../constant/types";
import { Logger } from "../../services/Logger";
import {
  ApiError,
  BadRequestError,
  FailedDependencyError,
  NotFoundError,
  ServiceError,
} from "../../lib/clients/errors";

@injectable()
export class ErrorResolver {
  @inject(TYPES.Logger)
  private readonly logger!: Logger;

  // eslint-disable-next-line no-unused-vars
  call(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
    // bypass existing HttpErrors
    if (ErrorResolver.isHttpError(err)) {
      return next(err);
    }

    // resolves remaining errors to HttpErrors
    if (err instanceof ApiError) {
      return this.handleExternalError(err, next);
    }
    return this.handleInternalError(err, next);
  }

  handleExternalError(err: ApiError, next: express.NextFunction): void {
    this.logExternalError(err);

    if (err instanceof ServiceError) {
      next(new HttpErrors.BadGateway());
      return;
    }
    if (err instanceof BadRequestError) {
      next(new HttpErrors.BadRequest());
      return;
    }
    if (err instanceof FailedDependencyError) {
      next(new HttpErrors.FailedDependency());
      return;
    }
    if (err instanceof NotFoundError) {
      next(new HttpErrors.NotFound());
    }
  }

  handleInternalError(err: Error, next: express.NextFunction): void {
    this.logInternalError(err);

    return next(new HttpErrors.InternalServerError());
  }

  static isHttpError(err: Error): boolean {
    return err instanceof HttpErrors.HttpError;
  }

  logExternalError(err: ApiError): void {
    const { request, response } = err.cause;
    const payload = { err, req: request, res: response };
    const message = "outgoing request errored";
    this.logger.error(message, payload);
  }

  logInternalError(err: Error): void {
    const payload = { err };
    const message = "internal error";
    this.logger.error(message, payload);
  }
}
