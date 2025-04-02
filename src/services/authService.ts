import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}

// Add axios interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', data);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error occurred. Please try again.');
  }
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('http://localhost:8080/api/register', data);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid registration data');
    }
    if (error.response?.status === 409) {
      throw new Error('Username or email already exists');
    }
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error occurred. Please check if the backend server is running.');
  }
};

export const logout = (): void => {
  localStorage.removeItem('user');
  // Remove the token from axios defaults
  delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = (): AuthResponse | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      // Set the token in axios defaults for subsequent requests
      if (user.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      }
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}; 