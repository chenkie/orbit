import React, { createContext, useEffect } from "react";
import axios from "axios";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const getCsurfToken = async () => {
      const { data } = await authAxios.get("/csurf-token");
      authAxios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };

    getCsurfToken();
  }, [authAxios]);

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
