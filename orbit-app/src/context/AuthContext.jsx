import React, { createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  return (
    <Provider
      value={{
        authState: {
          token: null,
          expiresAt: null,
          userInfo: {}
        }
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
