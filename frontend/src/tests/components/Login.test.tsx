import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import Login from '../../components/Login';
import { toast } from 'react-toastify';
import * as authContext from '../../contexts/AuthContext';
import { act } from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: jest.fn()
}));

describe('Login Component', () => {
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

  const renderLogin = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders login form', () => {
    renderLogin();

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('navigates to register page when clicking register link', () => {
    renderLogin();
    
    fireEvent.click(screen.getByTestId('register-link'));
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('handles successful login', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    mockLogin.mockResolvedValueOnce({});

    renderLogin();

    fireEvent.change(screen.getByTestId('email'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message when login fails', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    mockLogin.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Invalid credentials'
        }
      }
    });

    renderLogin();

    fireEvent.change(screen.getByTestId('email'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email ou senha inválidos');
    });
  });
}); 