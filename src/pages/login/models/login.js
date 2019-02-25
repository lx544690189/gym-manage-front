import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { userLogin, testGet } from '../service';

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    *testGet({ payload }, { call, put }) {
      yield call(testGet, payload);
    },
    *userLogin({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      if (response.success) {
        yield put(routerRedux.replace('/'));
      } else {
        message.error(response.message);
      }
    },
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};