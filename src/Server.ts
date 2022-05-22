import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as sourceMapSupport from "source-map-support";
import { app } from "./App";
import { container } from "./Container";
import TYPES from "./constant/types";
import { Logger } from "./services/Logger";
import DBConnection from "./db/Connection";

sourceMapSupport.install();

const errorResolver = container.get<express.RequestHandler>(TYPES.ErrorResolver);
const errorController = container.get<express.RequestHandler>(TYPES.ErrorController);
const logger = container.get<Logger>(TYPES.Logger);

const port = process.env.PORT || 8080;
const server = new InversifyExpressServer(container, null, null, app);
server.setErrorConfig((app) => {
  app.use(errorResolver.call.bind(errorResolver));
  app.use(errorController.call.bind(errorController));
})

const serverInstance = server.build();

async function start() {
  await DBConnection.connect();
  serverInstance.listen(port);
  logger.info(`Listening on port ${port}`);
}

start();