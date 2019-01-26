import { accountList, addAccount, updateAccount, resetPassword } from '../service';

export default {
  namespace: 'user',
  state: {
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
  },
  reducers: {
  },
};