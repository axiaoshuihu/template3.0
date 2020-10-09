import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from './auth';
// create an axios instance
// process.env.VUE_APP_BASE_API
// 'http://47.93.200.3:9501'
const service = axios.create({
  baseURL: 'http://139.196.42.209:5004/api/', // url = base url + request url
  // baseURL: process.env.VUE_APP_BASE_API + '/api/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) config.headers['token'] = getToken();
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code !== 20000) {
      if (response.data.code == 10001) {
          Message({
              message: 'token不存在或已过期，请重新登录',
              type: 'warning',
              duration: 2000
            });
      } else {
          Message({
              message: 'token不存在或已过期，请重新登录',
              type: 'warning',
              duration: 2000
            });
      }
  }
  return response;
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 2 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
