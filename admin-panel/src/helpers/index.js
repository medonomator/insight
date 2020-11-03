import axios from 'axios'
import { IS_DEVELOPMENT } from '../constants'

export const getBaseUrl = () =>
  IS_DEVELOPMENT ? 'http://localhost:5000' : 'http://83.166.242.213'

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const setToken = (token) => {
  localStorage.token = token
}

export const removeToken = () => {
  localStorage.token = ''
}

export const getToken = () => {
  return localStorage.token
}

export const Helpers = {
  trimText(text, value) {
    if (text && text.length > value) {
      text = text.slice(0, value) + '...'
      return text
    }

    return text
  },
}
