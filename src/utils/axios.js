import axios from 'axios';

const request = axios.create({
  baseURL: '/gym/',
  timeout: 10000,
  headers: {
    'x-csrf-token': '_RBPYFL_YKJNUrWJzzroJHsw',
  },
});

export default request;