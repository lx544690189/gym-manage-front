import request from '../../../utils/axios';

export function accountList(data){
  return request({
    method: 'post',
    url: '/account/list',
    data,
  });
}