import axios from 'axios';
import jwt from 'jsonwebtoken';
import { removeToken } from './token';

export default function setAuthorizationToken(token) {
  const decodedToken = jwt.decode(token);

  if (Date.now() > decodedToken.exp) {
    // removeToken();
  }

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
