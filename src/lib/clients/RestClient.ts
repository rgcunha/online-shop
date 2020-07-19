import axios, { AxiosError, AxiosRequestConfig } from "axios";
import qs from "qs";
import { BadRequestError, FailedDependencyError, NotFoundError, ServiceError } from "./errors";

export const enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export interface IContext {
  ipAddress: string;
}

export class RestClient {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get<T>(
    context: IContext,
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<T> {
    const method = HttpMethod.GET;
    return this.sendRequest(method, context, path, params, headers);
  }

  create<T, U>(
    context: IContext,
    path: string,
    data: U,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<T> {
    const method = HttpMethod.POST;
    return this.sendRequest<T, U>(method, context, path, params, headers, data);
  }

  update<T, U>(
    context: IContext,
    path: string,
    data: U,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<T> {
    const method = HttpMethod.PATCH;
    return this.sendRequest<T, U>(method, context, path, params, headers, data);
  }

  replace<T, U>(
    context: IContext,
    path: string,
    data: U,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<T> {
    const method = HttpMethod.PUT;
    return this.sendRequest<T, U>(method, context, path, params, headers, data);
  }

  delete(
    context: IContext,
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<void> {
    const method = HttpMethod.DELETE;
    return this.sendRequest(method, context, path, params, headers);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  private async sendRequest<T, U>(
    method: HttpMethod,
    context: IContext,
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    data?: U
  ): Promise<T> {
    const url = `${this.baseUrl}/${path}`;
    const { ipAddress } = context;
    const config: AxiosRequestConfig = RestClient.buildAxiosConfig<U>(method, ipAddress, url, params, headers, data);

    try {
      const response = await axios.request(config);
      return response ? response.data : null;
    } catch (err) {
      return RestClient.handleError(err);
    }
  }

  private static handleError(err: AxiosError): never {
    const { response } = err;

    if (response) {
      const cause = err;
      const { status } = response;
      if (status === 400) throw new BadRequestError({ cause });
      if (status === 404) throw new NotFoundError({ cause });
      if (status === 424) throw new FailedDependencyError({ cause });
      if (status >= 500) throw new ServiceError({ cause });
    }
    throw err;
  }

  private static buildAxiosConfig<T>(
    method: HttpMethod,
    ipAddress: string,
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    data?: T
  ): AxiosRequestConfig {
    return {
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        "x-ada-origin": "online-shop",
        "x-envoy-external-address": ipAddress,
        ...headers,
      },
      params,
      paramsSerializer: RestClient.paramsSerializer,
      maxRedirects: 0,
    };
  }

  private static paramsSerializer(params: Record<string, unknown>) {
    return qs.stringify(params);
  }
}
