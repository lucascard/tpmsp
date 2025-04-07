import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { AuthProvider } from '../../contexts/AuthContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('TopBar', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };

  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user name', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('should call logout and navigate when logout button is clicked', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
        </AuthProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /sair/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 