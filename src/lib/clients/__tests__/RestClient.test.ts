import axios from "axios";
import { RestClient } from "../RestClient";
import { BadRequestError, FailedDependencyError, NotFoundError, ServiceError } from "../errors";
import { AxiosError, AxiosResponse } from "../../../../test/factories";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RestClient", () => {
  const baseUrl = "http://localhost:8080";
  const client = new RestClient(baseUrl);
  const context = {
    ipAddress: "111.222.333.444",
  };
  const path = "path";
  const data = { foo: "bar" };
  const httpClientResponse = AxiosResponse.build({ data });

  afterEach(jest.clearAllMocks);

  it("initializes baseUrl", () => {
    expect(client.baseUrl).toEqual(baseUrl);
  });

  describe("get()", () => {
    it("returns http client response", async () => {
      mockedAxios.request.mockResolvedValue(httpClientResponse);

      const clientResponse = await client.get(context, path);
      expect(clientResponse).toEqual(data);
    });
  });

  describe("create()", () => {
    it("returns http client response", async () => {
      mockedAxios.post.mockResolvedValue(httpClientResponse);

      const clientResponse = await client.create(context, path, data);
      expect(clientResponse).toEqual(data);
    });
  });

  describe("update()", () => {
    it("returns http client response", async () => {
      mockedAxios.patch.mockResolvedValue(httpClientResponse);

      const clientResponse = await client.update(context, path, data);
      expect(clientResponse).toEqual(data);
    });
  });

  describe("replace()", () => {
    it("returns http client response", async () => {
      mockedAxios.put.mockResolvedValue(httpClientResponse);

      const clientResponse = await client.replace(context, path, data);
      expect(clientResponse).toEqual(data);
    });
  });

  describe("delete()", () => {
    it("returns http client response", async () => {
      mockedAxios.delete.mockResolvedValue(httpClientResponse);

      const clientResponse = await client.delete(context, path);
      expect(clientResponse).toEqual(data);
    });
  });

  describe("when httpClient rejects request", () => {
    describe("with status = 400", () => {
      const httpClientError = AxiosError.build({}, { status: 400 });

      it("throws BadRequestError", async () => {
        mockedAxios.request.mockRejectedValue(httpClientError);
        expect.assertions(1);

        try {
          await client.get(context, path);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestError);
        }
      });
    });

    describe("with status = 404", () => {
      const httpClientError = AxiosError.build({}, { status: 404 });

      it("throws BadRequestError", async () => {
        mockedAxios.request.mockRejectedValue(httpClientError);
        expect.assertions(1);

        try {
          await client.get(context, path);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundError);
        }
      });
    });

    describe("with status = 424", () => {
      const httpClientError = AxiosError.build({}, { status: 424 });

      it("throws FailedDependencyError", async () => {
        mockedAxios.request.mockRejectedValue(httpClientError);
        expect.assertions(1);

        try {
          await client.get(context, path);
        } catch (err) {
          expect(err).toBeInstanceOf(FailedDependencyError);
        }
      });
    });

    describe("with status = 500", () => {
      const httpClientError = AxiosError.build({}, { status: 500 });

      it("throws BadRequestError", async () => {
        mockedAxios.request.mockRejectedValue(httpClientError);
        expect.assertions(1);

        try {
          await client.get(context, path);
        } catch (err) {
          expect(err).toBeInstanceOf(ServiceError);
        }
      });
    });

    describe("with an unknown status code", () => {
      const httpClientError = AxiosError.build({}, { status: 402 });

      it("re-throws error", async () => {
        mockedAxios.request.mockRejectedValue(httpClientError);
        expect.assertions(1);

        try {
          await client.get(context, path);
        } catch (err) {
          expect(err).toEqual(httpClientError);
        }
      });
    });
  });
});
