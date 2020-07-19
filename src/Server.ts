import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as sourceMapSupport from "source-map-support";
import { app, logger } from "./App";
import { container } from "./Container";

sourceMapSupport.install();

const port = process.env.PORT || 8080;

const server = new InversifyExpressServer(container, null, null, app);
const serverInstance = server.build();
serverInstance.listen(port);
logger.info(`Listening on port ${port}`);
