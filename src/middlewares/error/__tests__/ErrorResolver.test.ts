import express from "express";
import HttpErrors from "http-errors";
import { Request, Response, AxiosError } from "../../../../test/factories";
import { container } from "../../../Container";
import TYPES from "../../../constant/types";
import { ILogger } from "../../../services/Logger";
import * as apiErrors from "../../../lib/clients/errors";
import { injectable } from "inversify";

@injectable()
class MockLogger implements ILogger {
  warn() {
    return "text";
  }
  info() {
    return "text";
  }
  error() {
    return "text";
  }
}

describe("ErrorResolver", () => {
  let errorResolver: express.RequestHandler;
  let spyError: jest.SpyInstance;

  beforeEach(() => {
    const logger = new MockLogger();

    container.snapshot();
    container.rebind<ILogger>(TYPES.Logger).toConstantValue(logger);

    spyError = jest.spyOn(logger, "error");

    errorResolver = container.get<express.RequestHandler>(TYPES.ErrorResolver);
  });

  afterEach(() => {
    container.restore();
  });

  describe("call()", () => {
    const res = Response.build();
    const req = Request.build();
    const next = jest.fn();

    describe("with an http error", () => {
      const httpError = new HttpErrors.NotFound();

      it("calls next middleware with error", async () => {
        errorResolver.call(httpError, req, res, next);

        expect(next).toHaveBeenCalledWith(httpError);
      });
    });

    /* eslint-disable indent */
    describe.each`
      errorClass                 | httpErrorClass
      ${"BadRequestError"}       | ${"BadRequest"}
      ${"FailedDependencyError"} | ${"FailedDependency"}
      ${"NotFoundError"}         | ${"NotFound"}
      ${"ServiceError"}          | ${"BadGateway"}
    `("with an external network error", ({ errorClass, httpErrorClass }) => {
      const cause = AxiosError.build();

      // the code below instantiates an error object dynamically. it converts to:
      // const err = new apiErrors.BadRequestError({ cause })
      const err = new (apiErrors as any)[errorClass]({ cause }); // eslint-disable-line @typescript-eslint/no-explicit-any

      it(`remaps ${errorClass} to HttpError.${httpErrorClass} and calls next middleware`, async () => {
        errorResolver.call(err, req, res, next);

        const httpError = new HttpErrors[httpErrorClass]();
        expect(next).toHaveBeenCalledWith(httpError);
      });

      it(`logs ${errorClass} cause`, () => {
        errorResolver.call(err, req, res, next);

        const message = "outgoing request errored";
        const payload = { err, req: cause.request, res: cause.response };

        expect(spyError).toHaveBeenCalledTimes(1);
        expect(spyError).toHaveBeenCalledWith(message, payload);
      });
    });

    /* eslint-enable indent */
    describe("with an internal error", () => {
      const err = new TypeError();

      it("remaps error to HttpError.InternalServerError and calls next middleware", async () => {
        errorResolver.call(err, req, res, next);
        const httpError = new HttpErrors.InternalServerError();

        expect(next).toHaveBeenCalledWith(httpError);
      });

      it("logs error", () => {
        errorResolver.call(err, req, res, next);

        const message = "internal error";
        const payload = { err };

        expect(spyError).toHaveBeenCalledTimes(1);
        expect(spyError).toHaveBeenCalledWith(message, payload);
      });
    });
  });
});
