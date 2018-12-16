
export default {
  namespace: 'global',
  state: {
    login: localStorage.getItem('login') === true,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
  },
  effects: {
    *setLoginState({ payload }, { call, put }) {
      localStorage.setItem('login',JSON.stringify(payload.login));
      localStorage.setItem('userInfo',JSON.stringify(payload.userInfo));
      yield put({
        type: 'updateLoginState',
        payload,
      });
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