import { tenantList, addressList, addTenantInfo, editTenantInfo} from '../service';

export default {
  namespace: 'tenant',
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(tenantList, payload);
      return response;
    },
    *addressList({ payload }, { call, put }) {
      const response = yield call(addressList, payload);
      return response;
    },
    *addTenantInfo({payload}, {call, put}){
      const response = yield call(addTenantInfo, payload);
      return response;
    },
    *editTenantInfo({payload}, {call, put}){
      const response = yield call(editTenantInfo, payload);
      return response;
    },
  },
};
