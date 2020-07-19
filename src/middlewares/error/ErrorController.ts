import express from "express";
import { HttpError } from "http-errors";
import { injectable } from "inversify";

export interface IError {
  message: string;
  status: number;
}

export interface IErrorDTO {
  error: IError;
}

@injectable()
export class ErrorController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental, @typescript-eslint/no-unused-vars
  static call(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    const status: number = err.status || 500;
    const message: string = err.message || "Unknown error";

    const dto: IErrorDTO = {
      error: {
        message,
        status,
      },
    };

    res.status(status);
    res.send(dto);
  }
}
