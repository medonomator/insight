import axios from 'axios'
import { getBaseUrl } from './'

export const API = (method, url, data, headers) => {
  return axios({
    method,
    url: `${getBaseUrl()}/${url}`,
    headers,
    data,
  })
}
