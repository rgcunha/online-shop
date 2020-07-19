import expressWinston from "express-winston";
import { Logger } from "../services/Logger";
import { Handler } from "express";

export function loggingMiddleware(logger: Logger): Handler {
  return expressWinston.logger({
    winstonInstance: logger.getLogger(),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    headerBlacklist: ["authorization"],
  });
}
