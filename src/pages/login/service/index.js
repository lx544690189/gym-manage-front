import request from '../../../utils/axios';

export function userLogin(data){
  return request({
    method: 'post',
    url: '/login',
    data,
  });
}

export function testGet(params){
  return request({
    method: 'get',
    url: '/test/get',
    params,
  });
}