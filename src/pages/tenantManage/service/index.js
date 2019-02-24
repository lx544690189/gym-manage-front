import request from '../../../utils/axios';

//获取租户信息
export function tenantList(params){
  return request({
    method:'get',
    url:'/tenant/list',
    params,
  });
}
//获取地址
export function addressList(){
  return request({
    method:'get',
    url:'/address/treeData',
  })
}