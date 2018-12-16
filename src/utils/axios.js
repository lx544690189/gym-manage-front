import axios from 'axios';

const request = axios.create({
  baseURL: '/gym/',
  timeout: 10000,
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request;