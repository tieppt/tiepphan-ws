import axios from 'axios';

export function createHttpInstance(
  baseURL: string,
  timeout = 10000,
  headers: Record<string, string> = {}
) {
  return axios.create({
    baseURL: baseURL,
    timeout,
    headers,
  });
}
