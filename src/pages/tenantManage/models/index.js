import { tenantList, addressList} from '../service';

export default {
  namespace:'tenant',
  state:{},
  effects:{
    *list({ payload }, { call, put }) {
      const response = yield call(tenantList, payload);
      return response;
    },
    *addressList({ payload }, { call, put }) {
      const response = yield call(addressList, payload);
      return response;
    },
  },
};
