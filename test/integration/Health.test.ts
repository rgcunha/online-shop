import request, { Response } from "supertest";
import { app } from "../../src/App";

describe.skip('Health endpoint', () => {
  describe('GET /health', () => {
    it('returns expected response', async () => {
      const response: Response = await request(app)
        .get('/api/health')

      expect(response.ok).toBe(true);
      expect(response.body).toEqual("OK");
    });
  });
});