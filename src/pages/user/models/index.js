import { accountList, addAccount } from '../service';

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
  },
  reducers: {
  },
};