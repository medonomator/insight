import axios from 'axios';

export const getBaseUrl = () => {
  return 'http://83.166.242.213';
  // return 'http://localhost:5000';
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
