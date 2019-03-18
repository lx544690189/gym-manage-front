import request from 'request';

export function roleList(params){
  return request({
    method: 'get',
    url: '/role/list',
    params,
  });
}

export function roleAdd(data){
  return request({
    method: 'post',
    url: '/role/add',
    data,
  });
}
export function roleEdit(data){
  return request({
    method: 'post',
    url: '/role/update',
    data,
  });
}