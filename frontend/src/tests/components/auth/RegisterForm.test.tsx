import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RegisterForm from '../../../components/auth/RegisterForm';
import { AuthProvider, useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import * as authContext from '../../../contexts/AuthContext';

jest.mock('../../../services/api');
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

describe('RegisterForm', () => {
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

  const renderRegisterForm = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders register form', () => {
    renderRegisterForm();

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    renderRegisterForm();

    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId('confirmPassword').querySelector('input') as HTMLInputElement;
    
    fireEvent.change(passwordInput, { target: { value: 'password123', name: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456', name: 'confirmPassword' } });
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000
      });
    }, { timeout: 1000 });
  });

  it('handles successful registration', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    mockRegister.mockResolvedValueOnce({});

    renderRegisterForm();

    const nameInput = screen.getByTestId('name').querySelector('input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email').querySelector('input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId('confirmPassword').querySelector('input') as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: name, name: 'name' } });
    fireEvent.change(emailInput, { target: { value: email, name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: password, name: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: password, name: 'confirmPassword' } });
    
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(name, email, password);
      expect(toast.success).toHaveBeenCalledWith('Registro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles registration error', async () => {
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

    renderRegisterForm();

    const nameInput = screen.getByTestId('name').querySelector('input') as HTMLInputElement;
    const emailInput = screen.getByTestId('email').querySelector('input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId('confirmPassword').querySelector('input') as HTMLInputElement;
    
    fireEvent.change(nameInput, { target: { value: name, name: 'name' } });
    fireEvent.change(emailInput, { target: { value: email, name: 'email' } });
    fireEvent.change(passwordInput, { target: { value: password, name: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: password, name: 'confirmPassword' } });
    
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Este email já está em uso', {
        position: 'top-right',
        autoClose: 3000
      });
    });
  });
}); 