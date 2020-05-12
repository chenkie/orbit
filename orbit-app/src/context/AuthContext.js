import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = () => {
    // TODO: Set the auth info in local storage
    // also authState
  };

  const logout = () => {
    // TODO: Remove auth items from local storage
    // and reset auth state.
    // Redirect the user to the login page.
  };

  const isAuthenticated = () => {
    // TODO: Compare the token expiry time to the
    // current time to tell whether or not the user
    // is authenticated
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
