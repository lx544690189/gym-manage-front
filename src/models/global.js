
import { routerRedux } from 'dva/router';
import { getUserInfo, logout } from '../service/index';

export default {
  namespace: 'global',
  state: {
    userInfo: {},
  },
  effects: {
    *setLoginState({ payload }, { call, put }) {
      yield put({
        type: 'updateLoginState',
        payload,
      });
    },
    // 获取用户信息
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      if (!response.data.success && response.data.login === false) {
        yield put(routerRedux.replace('/login'));
      } else {
        yield put({
          type: 'setLoginState',
          payload: {
            userInfo: response.data.data,
          },
        });
      }
    },
    // 登出
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      if (response.data.success) {
        yield put(routerRedux.replace('/login'));
      }
    },
  },
  reducers: {
    updateLoginState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};