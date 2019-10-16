import axios from 'axios';
/**
 * Request to api
 *
 * @param {String} url
 * @param {srting} method
 * @param {Object} axios config
 * @param {Object} axios headers
 *
 */
const api = (url, method, data, headers) =>
  axios({
    url,
    method,
    timeout: 30000,
    data,
    baseURL: 'http://localhost:5000/',
    // baseURL: PRODUCTION ? location.host : 'http://localhost:8081/',
    onUploadProgress: function(progressEvent) {
      console.log('загружаю');
    },

    onDownloadProgress: function(progressEvent) {
      console.log('загрузил');
    },
  });

export default api;
