import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Dashboard', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders dashboard title and welcome message', () => {
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo ao seu painel de controle!')).toBeInTheDocument();
  });

  it('renders top bar', () => {
    renderDashboard();
    expect(screen.getByText('TPMSP')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });
}); 