import {roleList, roleAdd, roleEdit}from '../service/index';

export default {
  namespace: 'role',
  state: {},
  effects: {
    *list({payload}, {call, put}){
      console.log('payload', payload);
      const response=yield call (roleList, payload);
      console.log('response', response);
      return response;
    },
    *add({ payload }, { call, put }) {
      const response = yield call(roleAdd, payload);
      return response;
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(roleEdit, payload);
      return response;
    },
  },
};