import request from '../utils/axios';

export function getBaseInfo(params){
  return request({
    method: 'get',
    url: '/account/getBaseInfo',
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

