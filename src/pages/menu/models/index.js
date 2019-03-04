import { getMenuTree } from '../service';

export default {
  namespace: 'menu',
  state: {
    menuTree: [],
  },
  effects: {
    *menuTree({ payload }, { call, put }) {
      const response = yield call(getMenuTree, payload);
      yield put({
        type: 'updateState',
        payload: {
          menuTree: response.data.rows,
        },
      });
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