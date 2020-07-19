import dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";
import basicAuth from "express-basic-auth";
import helmet from "helmet";
import { Logger } from "./services/Logger";
import { loggingMiddleware } from "./middlewares/Logger";
import { container } from "./Container";
import TYPES from "./constant/types";

const errorResolver = container.get<express.RequestHandler>(TYPES.ErrorResolver);
const errorController = container.get<express.RequestHandler>(TYPES.ErrorController);
const logger = container.get<Logger>(TYPES.Logger);

const app: express.Application = express();
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(loggingMiddleware(logger));

app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

//app.use(basicAuth({ users: { admin: process.env.BASIC_AUTH_PASSWORD as string } }));
app.use(errorResolver.call.bind(errorResolver));
app.use(errorController.call.bind(errorController));

export { app, logger };
