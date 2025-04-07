import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn() as jest.Mock<string | null, [string]>,
  setItem: jest.fn() as jest.Mock<void, [string, string]>,
  removeItem: jest.fn() as jest.Mock<void, [string]>,
  clear: jest.fn() as jest.Mock<void, []>,
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
  const { login, register, logout, isAuthenticated, user } = useAuth();
  
  return (
    <div>
      <button onClick={() => login('test@test.com', 'password')}>Login</button>
      <button onClick={() => register('Test', 'test@test.com', 'password', 'password')}>Register</button>
      <button onClick={logout}>Logout</button>
      <div data-testid="isAuthenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="userName">{user?.name || 'null'}</div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
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
      expect(screen.getByTestId('userName')).toHaveTextContent('Test User');
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
      expect(screen.getByTestId('userName')).toHaveTextContent('Test User');
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
      expect(screen.getByTestId('userName')).toHaveTextContent('null');
    });
  });

  it('should fetch user data when token exists', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-token');
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse.data.user });

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('userName')).toHaveTextContent('Test User');
    });
  });

  it('should logout when token is invalid', async () => {
    mockLocalStorage.getItem.mockReturnValue('fake-token');
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Invalid token'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('userName')).toHaveTextContent('null');
    });
  });
}); 