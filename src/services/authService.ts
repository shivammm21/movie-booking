import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export interface LoginRequest {
  username: string;
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

// Add axios interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      // Set the token in axios defaults for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    if (error.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Network error occurred. Please try again.');
  }
};

export const register = async (data: RegisterRequest): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response || error);
    if (error.response?.status === 400) {
      throw new Error(error.response.data || 'Invalid registration data');
    }
    if (error.response?.status === 409) {
      throw new Error('Username or email already exists');
    }
    if (error.response?.data) {
      throw new Error(error.response.data);
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