import { store } from '../store/store';
import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout:  process.env.REACT_APP_API,
  headers: {
  },
});

Api.interceptors.request.use(async config => {
  const  auth = store.getState().auth;
  config.headers.Accept = 'application/json';
  config.headers.Authorization = `Bearer ${auth.accessToken}`;
  return config;
});

Api.interceptors.response.use(
  async response => response,
    async error => {
      if (error.response.status === 500) {
        console.log('Ops, ocorreu um erro, tente novamente!');
      } else if (error.response.status === 404) {
        console.log('Ops, não encontrado!');
      } else if (error.response.status === 400) {
        if (error && error.response && error.response.data && error.response.data.errors) {
          for (const msg in error.response.data.errors) {
            console.log(error.response.data.errors[msg]);
          }
        }
      } else if (error.response.status === 401) {
          console.log("Expired");
      }

      throw error.response.data.errors;
    },
);

export default Api;
