import request, { Response } from "supertest";
import { app } from "../../src/App";

describe("A request to the health endpoint", () => {
  it("should be possible without basic header", async () => {
    const response: Response = await request(app).get("/api/health");
    expect(response.ok).toBe(true);
  });
});
xdescribe("A request to other endpoints", () => {
  it("returns 401 when authorization header is not set", async () => {
    const response: Response = await request(app).get("/api/next");
    expect(response.unauthorized).toBe(true);
  });
});
