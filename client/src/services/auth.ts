import axios from 'axios';
import type { SignupRequest, ApiResponse, User } from '../types/auth.types';

const API_BASE_URL = '${API_URL}'

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

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

export const auth = {
    async signup(userData: SignupRequest): Promise<ApiResponse<{
        userId: number;
        email: string;
        name: string;
    }>> {
        try {
            const response = await client.post<ApiResponse>("/auth/singup", userData);
            return response.data;
        } catch(error: any) {
            if(error.response?.data) {
                throw new Error(error.response.data.message || "Singup failed");
            }

            throw new Error("Network error");
        }
    },
};

// export const useAuth = () => {
//     return { singup: auth.singup, }
// }