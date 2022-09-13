import type { Never } from '@~types/never';
import type { UnsetResolve } from '@~types/unsetResolve';

import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import getEnv from '@utils/getEnv';

export { apiGet, apiPost, apiPut, apiDelete };

type ConfigRequest<TParams, TBody> = AxiosRequestConfig & {
  data?: TBody;
  params?: TParams;
};

type ResolvedResponse<TSuccess, TError> =
  | (Never<AxiosResponse<TSuccess>> & {
      error: AxiosError<TError>;
    })
  | (AxiosResponse<TSuccess> & {
      data: null;
      error: null;
    })
  | (AxiosResponse<TSuccess> & {
      error: null;
    });

const createApi = <Method extends 'GET' | 'POST' | 'PUT' | 'DELETE'>(
  method: Method,
) => {
  const axiosInstance = axios.create({
    method,
    baseURL: getEnv<string>('VITE_API_ENDPOINT', 'string'),
  });

  return async function <
    T extends {
      params?: unknown;
      body?: unknown;
      success?: unknown;
      error?: unknown;
    },
    Parmas = UnsetResolve<T['params']>,
    Body = UnsetResolve<T['body']>,
    Response = UnsetResolve<T['success']>,
    ResponseOnError = UnsetResolve<T['error']>,
  >(
    pathname: string,
    config?: ConfigRequest<Parmas, Body>,
  ): Promise<ResolvedResponse<Response, ResponseOnError>> {
    try {
      const response = await axiosInstance({
        url: pathname,
        ...config,
      });

      return { ...response, error: null };
    } catch (err: any) {
      return { error: err as AxiosError<ResponseOnError> };
    }
  };
};

const apiGet = createApi('GET');
const apiPost = createApi('POST');
const apiPut = createApi('PUT');
const apiDelete = createApi('DELETE');
