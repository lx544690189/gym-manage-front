import request from '../../../utils/axios';

export function getMenuTree(params){
  return request({
    method: 'get',
    url: 'menu/list',
    params,
  });
}