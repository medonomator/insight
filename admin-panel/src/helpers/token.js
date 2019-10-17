export function setToken(token) {
  localStorage.token = token;
}

export function removeToken() {
  localStorage.token = '';
}

export function getToken() {
  return localStorage.token;
}
