import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import {
  AuthProvider,
  AuthContext
} from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppShell from './AppShell';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FourOFour from './pages/FourOFour';

import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Users from './pages/Users';

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() && auth.isAdmin() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
      <AdminRoute path="/inventory">
        <Inventory />
      </AdminRoute>
      <AuthenticatedRoute path="/account">
        <Account />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/users">
        <Users />
      </AuthenticatedRoute>
      <UnauthenticatedRoutes />
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
