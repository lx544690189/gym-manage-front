import request from '../../../utils/axios';

// 获取用户列表
export function accountList(data){
  return request({
    method: 'post',
    url: '/account/list',
    data,
  });
}

// 新增用户
export function addAccount(data){
  return request({
    method: 'post',
    url: '/account/add',
    data,
  });
}

// 更新用户信息
export function updateAccount(data){
  return request({
    method: 'post',
    url: '/account/update',
    data,
  });
}

// 重置用户密码
export function resetPassword(data){
  return request({
    method: 'post',
    url: '/account/resetPassword',
    data,
  });
}