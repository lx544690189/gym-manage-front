import request from '../../../utils/axios';

// 获取租户信息
export function tenantList(params){
  return request({
    method: 'get',
    url: '/tenant/list',
    params,
  });
}
// 获取地址
export function addressList(){
  return request({
    method: 'get',
    url: '/address/treeData',
  });
}
// 新增
export function addTenantInfo(data) {
  return request({
    method: 'post',
    url: '/tenant/add',
    data,
  });
}
// 修改
export function editTenantInfo(data){
  return request({
    method: 'post',
    url: '/tenant/update',
    data,
  });
}