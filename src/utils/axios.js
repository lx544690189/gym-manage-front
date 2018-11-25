import axios from 'axios';

const request = axios.create({
  baseURL: '/gym/',
  timeout: 10000,
  headers: {
    'x-csrf-token': 'CsaqsmcMedQWqJ26R6v2m6a5',
  },
});

export default request;