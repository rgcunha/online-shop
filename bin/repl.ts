import repl from "repl";
import { app } from '../src/App';
import { container } from '../src/Container';
import TYPES from '../src/constant/types';

// open the repl session
const replServer = repl.start({
  prompt: `ada-bff (${process.env.ENVIRONMENT}) >`,
});

// attach app modules to the repl context
replServer.context.app = app;
replServer.context.container = container;
replServer.context.TYPES = TYPES;

replServer.on('exit', () => {
  console.log('Received "exit" event from repl!');
  process.exit();
});