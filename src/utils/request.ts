import { baseURL, apiKey } from '@/config/app.config';
import { HTTP_STATUS } from '@/config/constant';
import { log } from './logger';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders, Method } from 'axios';

export interface IRequestData {
  url: string;
  data?: Object;
  contentType?: string;
  headers?: Array<{ key: string; value: string }>;
}

// 定义可使用的Request方法
export type RequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 36000000, // request timeout
  withCredentials: true // 允许携带cookie
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let headers: AxiosRequestHeaders = config.headers ? config.headers : {};
    headers['X-Requested-With'] = 'XMLHttpRequest';
    headers['X-SS-API-KEY'] = apiKey;
    config.headers = headers || {};
    return config;
  },
  (error: any) => {
    return Promise.reject('请求超时');
  }
);

service.interceptors.response.use(
  (response: AxiosResponse<unknown, any>) => {
    return new Promise<any>((resolve, reject) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        switch (response.status) {
          case 401:
            return Promise.reject(new Error('无此权限'));
          case 403:
            return Promise.reject(new Error('禁止访问'));
          case 404:
            return Promise.reject(new Error('接口不存在'));
          case 500:
            return Promise.reject(new Error('接口发送了异常'));
          case 504:
            return Promise.reject(new Error('代理接口服务不可用'));
          case 502:
            return Promise.reject(new Error('接口代理出错'));
          default:
            return Promise.reject(new Error('请求失败'));
        }
      }
    });
  },
  (error: any) => {
    return Promise.reject('请求发生错误');
  }
);

export const queryString = (params?: Record<string, string>): string => {
  if (!params) {
    return '';
  }
  return (
    '?' +
    Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
  );
};

export const requestContentTypeHeader = (contentType?: string): AxiosRequestHeaders => {
  return !contentType ? {} : { 'content-type': contentType };
};

export default {
  reeust(
    method: Method,
    url: string,
    params: Record<string, string>,
    data?: any,
    contentType?: string
  ) {
    return service.request({
      url: url,
      method: method,
      params: queryString(params),
      headers: requestContentTypeHeader(contentType),
      data
    });
  },

  get(url: string, params: Record<string, string>, contentType?: string) {
    return service.get(url + queryString(params), {
      headers: requestContentTypeHeader(contentType)
    });
  },

  del(url: string, params: Record<string, string>, contentType?: string) {
    return service.delete(url + queryString(params), {
      headers: requestContentTypeHeader(contentType)
    });
  },

  post(url: string, params: Record<string, string>, data?: any, contentType?: string) {
    return service.post(url + queryString(params), {
      headers: requestContentTypeHeader(contentType),
      data
    });
  },

  put(url: string, params: Record<string, string>, data?: any, contentType?: string) {
    return service.put(url + queryString(params), {
      headers: requestContentTypeHeader(contentType),
      data
    });
  }
};
