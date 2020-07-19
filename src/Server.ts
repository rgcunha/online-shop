import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as sourceMapSupport from "source-map-support";
import { app, logger } from "./App";
import { container } from "./Container";
import DBConnection from "./db/Connection";

sourceMapSupport.install();

const port = process.env.PORT || 8080;
const server = new InversifyExpressServer(container, null, null, app);
const serverInstance = server.build();

async function start() {
  await DBConnection.connect();
  serverInstance.listen(port);
  logger.info(`Listening on port ${port}`);
}

start();