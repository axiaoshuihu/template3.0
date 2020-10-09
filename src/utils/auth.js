// import Cookies from 'js-cookie'

const TokenKey = 'usertoken';
const FromKey = 'fromPath';

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(FromKey);
  return sessionStorage.removeItem(TokenKey);
}

