import { accountList } from '../service';

export default {
  namespace: 'user',
  state: {
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(accountList, payload);
      return response;
    },
  },
  reducers: {
  },
};