export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse<T = any> {
    message: string;
    success: boolean;
    data?: T;
}

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface AuthState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
}

export interface FieldError {
  message?: string;
}

export interface FormErrors {
  name?: FieldError;
  email?: FieldError;
  password?: FieldError;
}