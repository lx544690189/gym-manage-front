import {userLogin,testGet} from '../service';

export default {
  namespace: 'login',
  state: {
    
  },
  effects: {
    *testGet({ payload }, { call, put }) {
      yield call(testGet, payload);
    },
    *userLogin({ payload }, { call, put }) {
      const data = yield call(userLogin, payload);
      yield put({
        type: 'updateState',
        payload: data,
      });
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