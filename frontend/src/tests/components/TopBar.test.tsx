import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import { AuthProvider } from '../../contexts/AuthContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('TopBar', () => {
  const renderTopBar = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders user name and logout button', () => {
    renderTopBar();
    expect(screen.getByText('TPMSP')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('calls logout and navigates to login when logout button is clicked', async () => {
    renderTopBar();
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 