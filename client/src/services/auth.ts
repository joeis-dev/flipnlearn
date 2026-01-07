import axios from 'axios';
import type { SignupRequest, ApiResponse } from '../types/auth.types';

// TODO: Move to .env file
const API_BASE_URL = 'http://localhost:8080/api';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// https://axios-http.com/docs/interceptors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(
            "API Error: ",
            error.response?.data || error.message
        );
        return Promise.reject(error);
    }
)

const messageStorage = {
    setSuccessMessage: (message: string) => {
        localStorage.setItem('auth_success_message', message);
        setTimeout(() => {
            localStorage.removeItem('auth_success_message');
        }, 5000);
    },

    setErrorMessage: (message: string) => {
        localStorage.setItem('auth_error_message', message);
        setTimeout(() => {
            localStorage.removeItem('auth_error_message');
        }, 5000);
    },

    getSuccessMessage: (): string | null => {
        const message = localStorage.getItem('auth_success_message');
        localStorage.removeItem('auth_success_message');
        return message;
    },

    getErrorMessage: (): string | null => {
        const message = localStorage.getItem('auth_error_message');
        localStorage.removeItem('auth_error_message');
        return message;
    },

    clearMessages: () => {
        localStorage.removeItem('auth_success_message');
        localStorage.removeItem('auth_error_message');
    }

}


export const auth = {
    async signup(userData: SignupRequest): Promise<ApiResponse<{
        userId: number;
        email: string;
        name: string;
    }>> {
        try {
            // TODO: make the endpoint an env variable
            const response = await client.post<ApiResponse>("/auth/signup", userData);

            if(response.data.success && response.data.message) {
                messageStorage.setSuccessMessage(response.data.message);
            }

            return response.data;
        } catch (error: any) {
            const { status, data } = error.response;
            let userMessage = "Signup failed. Please try again.";

            if (status) {
                switch (status) {
                    case 400:
                        userMessage = (data.message || "Invalid data. Please check your information.");
                        break;
                    case 409:
                        userMessage = ("Email already exists. Please use a different email.");
                        break;
                    case 422:
                        userMessage = ("Validation failed. Please check all fields.");
                        break;
                    case 500:
                        userMessage = ("Server error. Please try again later.");
                        break;
                    default:
                        userMessage = (data.message || "Registration failed");
                }

                messageStorage.setErrorMessage(data.message || "Registration failed");
            } else if(error.request) {
                userMessage = "Network error. Please check your connection.";
                messageStorage.setErrorMessage(userMessage);
            }

            throw new Error(userMessage);
        }
    }
};

// export const useAuth = () => {
//     return { singup: auth.singup, }
// }
