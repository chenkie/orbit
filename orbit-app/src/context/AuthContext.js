import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
    userInfo: {}
  });

  const setAuthInfo = ({
    token, userInfo, expiresAt
  })=> {
   setAuthState({
    token, userInfo, expiresAt
   })
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo)
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
