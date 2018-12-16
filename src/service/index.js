import request from '../utils/axios';

export function getUserInfo(params){
  return request({
    method: 'get',
    url: '/account/getUserInfo',
    params,
  });
}

export function logout(params){
  return request({
    method: 'get',
    url: '/logout',
    params,
  });
}

