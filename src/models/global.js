
import { routerRedux } from 'dva/router';
import { getBaseInfo, logout } from '../service/index';

export default {
  namespace: 'global',
  state: {
    userInfo: {},
    menu: {},
    qiniu: {},
  },
  effects: {
    *setLoginState({ payload }, { call, put }) {
      yield put({
        type: 'updateLoginState',
        payload,
      });
    },
    // 获取基本信息
    *getBaseInfo({ payload }, { call, put }) {
      const response = yield call(getBaseInfo, payload);
      if (!response.success && response.login === false) {
        yield put(routerRedux.replace('/login'));
      } else {
        yield put({
          type: 'setLoginState',
          payload: response.data,
        });
      }
    },
    // 登出
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      if (response.success) {
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