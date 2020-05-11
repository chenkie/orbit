import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${authContext.authState.token}`
    }
  });

  authAxios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const code =
        error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
      }
      return Promise.reject(error);
    }
  );

  const authGet = route => authAxios.get(`/${route}`);

  const authPost = (route, payload) =>
    authAxios.post(route, payload);

  const authPatch = (route, payload) =>
    authAxios.patch(route, payload);

  const authDelete = route => authAxios.delete(route);

  return (
    <Provider
      value={{
        authGet,
        authPost,
        authPatch,
        authDelete
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
