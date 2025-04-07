import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import Register from '../../components/Register';
import { toast } from 'react-toastify';
import * as authContext from '../../contexts/AuthContext';

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

describe('Register Component', () => {
  const mockRegister = jest.fn();
  
  beforeEach(() => {
    jest.spyOn(authContext, 'useAuth').mockImplementation(() => ({
      register: mockRegister,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: false
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderRegister = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders register form', () => {
    renderRegister();

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    renderRegister();

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password456' } });
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000
      });
    });
  });

  it('handles successful registration', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    mockRegister.mockResolvedValueOnce({});

    renderRegister();

    fireEvent.change(screen.getByTestId('name'), { target: { value: name } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(name, email, password);
      expect(toast.success).toHaveBeenCalledWith('Registro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message when registration fails', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    mockRegister.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Email already exists'
        }
      }
    });

    renderRegister();

    fireEvent.change(screen.getByTestId('name'), { target: { value: name } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Este email já está em uso', {
        position: 'top-right',
        autoClose: 3000
      });
    });
  });
}); 