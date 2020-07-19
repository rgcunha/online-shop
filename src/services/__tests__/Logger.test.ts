import "jest-extended";

import { Logger } from "../Logger";

const spy = jest.spyOn(process.stdout, "write");

afterEach(jest.clearAllMocks);

describe("a logger instance", () => {
  const logger = new Logger();
  it("logs to std out with info", () => {
    logger.info("test");
    expect(spy).toHaveBeenCalled();

    const argument = spy.mock.calls[0][0];
    expect(argument).toBeTruthy();

    const logs = String(argument);
    expect(logs).toContain('"level":"info"');
    expect(logs).toContain('"message":"test"');
  });
  it("logs to std out with warn", () => {
    logger.warn("test", { empty: "payload" });
    expect(spy).toHaveBeenCalled();

    // Get the first argument of the first call
    const argument = spy.mock.calls[0][0];
    expect(argument).toBeTruthy();

    const logs = String(argument);

    expect(logs).toContain('"level":"warn"');
    expect(logs).toContain('"empty":"payload"');
  });
  it("logs to std out with error", () => {
    logger.error("test");
    expect(spy).toHaveBeenCalled();

    const argument = spy.mock.calls[0][0];
    expect(argument).toBeTruthy();

    const logs = String(argument);
    expect(logs).toContain('"level":"error"');
    expect(logs).toContain('"message":"test"');
  });
});
