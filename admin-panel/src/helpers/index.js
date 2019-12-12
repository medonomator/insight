import axios from 'axios';

export const getBaseUrl = () => {
  return 'http://134.209.163.196';
  // return 'localhost:5000';
};

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const setToken = token => {
  localStorage.token = token;
};

export const removeToken = () => {
  localStorage.token = '';
};

export const getToken = () => {
  return localStorage.token;
};
