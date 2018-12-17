import { accountList } from '../service';

export default {
  namespace: 'page2',
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