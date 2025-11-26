import { useState } from 'react';
import type { SignupRequest, ApiResponse, User, AuthState } from '../types/auth.types';
import { auth } from '../services/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const signup = async (userData: SignupRequest): Promise<ApiResponse> => {
    setAuthState({ isLoading: true, error: null, isSuccess: false });
    
    try {
      const response = await auth.signup(userData);
      setAuthState({ isLoading: false, error: null, isSuccess: true });
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      setAuthState({ isLoading: false, error: errorMessage, isSuccess: false });
      throw error;
    }
  };

  const resetAuthState = () => {
    setAuthState({ isLoading: false, error: null, isSuccess: false });
  };

  return {
    signup,
    authState,
    resetAuthState,
  };
};