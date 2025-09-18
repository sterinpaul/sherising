import type { AuthState, User } from '../types/dashboard';

const AUTH_STORAGE_KEY = 'she-rising-auth';

export const authUtils = {
  // Get current auth state
  getAuthState(): AuthState {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading auth state:', error);
    }
    
    return {
      isAuthenticated: false,
      user: null,
      token: null
    };
  },

  // Set auth state
  setAuthState(authState: AuthState): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } catch (error) {
      console.error('Error storing auth state:', error);
    }
  },

  // Login user
  login(email: string, password: string): Promise<AuthState> {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock authentication - replace with real API call
        if (email === 'admin@sherising.org' && password === 'Admin123') {
          const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@sherising.org',
            role: 'admin'
          };

          const authState: AuthState = {
            isAuthenticated: true,
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now()
          };

          this.setAuthState(authState);
          resolve(authState);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const authState = this.getAuthState();
    return authState.isAuthenticated && !!authState.token;
  },

  // Get current user
  getCurrentUser(): User | null {
    const authState = this.getAuthState();
    return authState.user;
  },

  // Get auth token
  getToken(): string | null {
    const authState = this.getAuthState();
    return authState.token;
  }
};