import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../../../components/auth/RegisterForm';
import { AuthProvider } from '../../../contexts/AuthContext';
import api from '../../../services/api';

jest.mock('../../../services/api');

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders register form', () => {
    render(
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('handles successful registration', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({});

    render(
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(screen.getByText(/conta criada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('shows error when passwords do not match', async () => {
    render(
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), {
      target: { value: 'differentpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument();
  });

  it('handles registration error', async () => {
    const errorMessage = 'Email já cadastrado';
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    render(
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 