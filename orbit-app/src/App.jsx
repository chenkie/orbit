import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppShell from './layout';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Users from './pages/Users';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
      <Route path="/inventory" element={<AppShell><Inventory /></AppShell>} />
      <Route path="/account" element={<AppShell><Account /></AppShell>} />
      <Route path="/settings" element={<AppShell><Settings /></AppShell>} />
      <Route path="/users" element={<AppShell><Users /></AppShell>} />
      <Route path="*" element={<FourOFour />} />
    </Routes>
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
