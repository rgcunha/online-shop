import "reflect-metadata";
import { injectable } from "inversify";
import winston from "winston";

export interface ILogger {
  info(message: string, payload?: Record<string, unknown>): void;
  warn(message: string, payload?: Record<string, unknown>): void;
  error(message: string, payload?: Record<string, unknown>): void;
}

@injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL,
      format: process.env.PRETTY_LOGS
        ? winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.prettyPrint())
        : winston.format.combine(winston.format.timestamp(), winston.format.json()),
      defaultMeta: { service: "online-shop" },
      transports: [new winston.transports.Console()],
    });
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }

  public info(message: string, payload?: Record<string, unknown>): void {
    this.logger.info(message, payload);
  }

  public warn(message: string, payload?: Record<string, unknown>): void {
    this.logger.warn(message, payload);
  }

  public error(message: string, payload?: Record<string, unknown>): void {
    this.logger.error(message, payload);
  }
}
