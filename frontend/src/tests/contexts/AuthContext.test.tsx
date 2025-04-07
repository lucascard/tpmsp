import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock do api
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    interceptors: {
      request: { 
        use: jest.fn((callback) => {
          callback({ headers: {} });
          return Promise.resolve();
        })
      },
      response: { use: jest.fn() }
    },
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }
}));

const mockResponse = {
  data: {
    token: 'fake-token',
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@test.com'
    }
  }
};

const TestComponent = () => {
  const { login, register, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      <button onClick={() => login('test@test.com', 'password')}>Login</button>
      <button onClick={() => register('Test', 'test@test.com', 'password')}>Register</button>
      <button onClick={logout}>Logout</button>
      <div data-testid="isAuthenticated">{isAuthenticated ? 'true' : 'false'}</div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should handle login', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@test.com',
        password: 'password'
      });
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    });
  });

  it('should handle register', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        name: 'Test',
        email: 'test@test.com',
        password: 'password'
      });
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    });
  });

  it('should handle logout', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    });
  });
}); 