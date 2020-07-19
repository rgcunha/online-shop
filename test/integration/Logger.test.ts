import request, { Response } from "supertest";
import { app } from "../../src/App";

const spy = jest.spyOn(process.stdout, "write");
describe("the logger logs every request when started on level info", () => {
  it("should filter non whitelisted headers in a request", async () => {
    const response: Response = await request(app)
      .get("/api/health")
      .set("user-agent", "Fancy-Assessment-App")
      .set("Authorization", "should be blocked");
    expect(response.ok);
    expect(spy).toHaveBeenCalled();
    // Get the first argument of the first call
    const argument = spy.mock.calls[0][0];
    expect(argument).toBeTruthy();

    const log = String(argument);
    expect(log).toContain("user-agent");
    expect(log).not.toContain("authorization");
  });
});
