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

const UnauthenticatedRoutes = () => {
  // TODO: Set up a list of unauthenticated routes
  // using the regular <Route> component
};

const AuthenticatedRoute = ({ children, ...rest }) => {
  // TODO: implement the authenticated route component
};

const AdminRoute = ({ children, ...rest }) => {
  // TODO: implement the admin route component
};

const AppRoutes = () => {
  return (
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
      <Route path="/dashboard">
        <AppShell>
          <Dashboard />
        </AppShell>
      </Route>
      <Route path="/inventory">
        <AppShell>
          <Inventory />
        </AppShell>
      </Route>
      <Route path="/account">
        <AppShell>
          <Account />
        </AppShell>
      </Route>
      <Route path="/settings">
        <AppShell>
          <Settings />
        </AppShell>
      </Route>
      <Route path="/users">
        <AppShell>
          <Users />
        </AppShell>
      </Route>
      <Route path="*">
        <FourOFour />
      </Route>
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
