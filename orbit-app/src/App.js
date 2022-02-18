import React, { lazy, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./App.css";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import AppShell from "./AppShell";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FourOFour from "./pages/FourOFour";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const AuthenticatedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const AdminRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return auth.isAuthenticated() && auth.isAdmin() ? (
    <AppShell>{children}</AppShell>
  ) : (
    <Navigate to="/" />
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <AdminRoute>
                <Inventory />
              </AdminRoute>
            }
          />
          <Route
            path="/account"
            element={
              <AuthenticatedRoute>
                <Account />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthenticatedRoute>
                <Settings />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AuthenticatedRoute>
                <Users />
              </AuthenticatedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Suspense>
    </>
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
