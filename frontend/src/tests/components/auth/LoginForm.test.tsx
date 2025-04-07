import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import LoginForm from '../../../components/auth/LoginForm';
import { AuthProvider, useAuth } from '../../../contexts/AuthContext';
import * as authContext from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../../contexts/AuthContext'),
  useAuth: jest.fn()
}));

jest.mock('../../../services/api', () => ({
  post: jest.fn()
}));

describe('LoginForm Component', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.spyOn(authContext, 'useAuth').mockImplementation(() => ({
      login: mockLogin,
      user: null,
      register: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: false
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );
    
    const emailInput = screen.getByTestId('email').querySelector('input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;
    
    fireEvent.input(emailInput, {
      target: { value: 'test@test.com' }
    });
    fireEvent.input(passwordInput, {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
    });
  });

  it('shows error message on login failure', async () => {
    const errorMessage = 'Credenciais inválidas';
    mockLogin.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByTestId('email').querySelector('input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;
    
    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'wrongpassword' } });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 