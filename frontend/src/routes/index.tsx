import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import { MainLayout } from '../components/MainLayout';
import TestPlansPage from '../pages/test-plans/TestPlansPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      {isAuthenticated && (
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="test-plans" element={<TestPlansPage />} />
          <Route path="test-suites" element={<div>Suítes de Teste</div>} />
          <Route path="test-cases" element={<div>Casos de Teste</div>} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes; 