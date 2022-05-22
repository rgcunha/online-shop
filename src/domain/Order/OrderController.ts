import { NextFunction, Request, Response } from "express";
import HttpErrors from "http-errors";
import { controller, httpGet, next, request, response } from "inversify-express-utils";

@controller("/api/orders")
export default class OrderController {
  constructor(
  ) {}

  @httpGet("/")
  public get(@request() req: Request, @response() res: Response, next: NextFunction): string[] {
    if (req.isAuthenticated()) {
      const orders = ["a", "b", "c"];
      return orders;
    } else {
      const httpError = new HttpErrors.Unauthorized()
      throw httpError;
    }
  }
}
