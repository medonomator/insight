import axios, { AxiosPromise, AxiosResponse, Method } from 'axios';
import { baseURL } from '../constants/urls';
/**
 * Request to api
 *
 * @param {String} url
 * @param {srting} method
 * @param {Object} axios config
 * @param {Object} axios headers
 * @return {Promise} AxiosPromise<AxiosResponse>
 */
const api = (
  url: string,
  method: Method,
  data?: object,
  headers?: object,
): AxiosPromise<AxiosResponse> =>
  axios({
    url,
    method,
    timeout: 30000,
    data,
    headers,
    baseURL,
    onUploadProgress: function(progressEvent) {
      console.log('загружаю');
    },

    onDownloadProgress: function(progressEvent) {
      console.log('загрузил');
    },
  });

export default api;
