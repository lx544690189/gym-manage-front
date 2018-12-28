import request from '../../../utils/axios';

export function accountList(data){
  return request({
    method: 'post',
    url: '/account/list',
    data,
  });
}

export function addAccount(data){
  return request({
    method: 'post',
    url: '/account/add',
    data,
  });
}