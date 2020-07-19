import express from "express";
import HttpErrors from "http-errors";
import { IErrorDTO } from "../ErrorController";
import { Request, Response } from "../../../../test/factories";
import { container } from "../../../Container";
import TYPES from "../../../constant/types";

describe("ErrorController", () => {
  let errorController: express.RequestHandler;

  beforeAll(() => {
    errorController = container.get<express.RequestHandler>(TYPES.ErrorController);
  });

  describe("call()", () => {
    const next = jest.fn();
    const status = jest.fn();
    const send = jest.fn();
    const req = Request.build();
    const res = Response.build({ status, send });
    const err = new HttpErrors.UnprocessableEntity();

    it("responds with error dto", async () => {
      errorController.call(err, req, res, next);

      const dto: IErrorDTO = {
        error: {
          message: err.message,
          status: err.status,
        },
      };

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(dto);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(err.status);
    });
  });
});
