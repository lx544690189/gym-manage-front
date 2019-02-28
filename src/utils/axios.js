import axios from 'axios';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

const request = axios.create({
  baseURL: '/gym/',
  timeout: 10000,
});

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  return response.data;
}, function(error, data) {
  if (error.response.status === 403 && error.response.data.code === 4031) {
    // 如何访问到 store 或 dispatch 方法？https://umijs.org/zh/guide/with-dva.html#faq
    window.g_app._store.dispatch(
      routerRedux.replace('/login')
    );
  } else {
    message.error('服务器出错，请稍后再试！');
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request;