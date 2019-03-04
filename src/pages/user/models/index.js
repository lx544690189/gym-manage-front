import {
  accountList,
  addAccount,
  updateAccount,
  resetPassword,
  roleList,
} from '../service';

export default {
  namespace: 'user',
  state: {
    roleList: [],
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(accountList, payload);
      return response;
    },
    *addAccount({ payload }, { call, put }) {
      const response = yield call(addAccount, payload);
      return response;
    },
    *updateAccount({ payload }, { call, put }) {
      const response = yield call(updateAccount, payload);
      return response;
    },
    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
      return response;
    },
    *roleList({ payload }, { call, put }) {
      const response = yield call(roleList, payload);
      yield put({
        type: 'updateState',
        payload: {
          roleList: response.data.rows,
        },
      });
      return response;
    },
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};