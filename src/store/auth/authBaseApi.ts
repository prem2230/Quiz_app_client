import callApi from '../../api/api';

interface LoginPayload {
    email?: string;
    username?: string;
    number?: number;
    password: string;
}

interface RegisterPayload {
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
    number: number | null;
}

export const LOGIN_USER = '/user/login';
export const REGISTER_USER = '/user/register';

const api = callApi();

export const loginUser = async (payload : LoginPayload) => api.post(LOGIN_USER, payload);
export const registerUser = async (payload: RegisterPayload) => api.post(REGISTER_USER, payload);