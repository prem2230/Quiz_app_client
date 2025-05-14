import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    username: string;
    role: string,
    number: number;
}

interface LoginResponse {
    success: string;
    message: string;
    token: string;
    user: User;
}
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    token: string | null;
    lastRegistered: User | null;
}

interface RegisterResponse {
    success: string;
    message: string;
    user: User
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    token: null,
    lastRegistered: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.lastRegistered = null;
            state.loading = false;
            localStorage.setItem('token', action.payload.token);
        },
        registerSuccess: (state, action: PayloadAction<RegisterResponse>) => {
            state.lastRegistered = action.payload.user;
            state.loading = false;
        },
        getUserSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = localStorage.getItem('token');
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        resetRegistered: (state) => {
            state.lastRegistered = null;
        }
    },
})

export const authActions = {
    loginRequest: createAction(`${authSlice.name}/loginRequest`, (payload) => {
        return { payload }
    }),
    registerRequest: createAction(`${authSlice.name}/registerRequest`, (payload) => {
        return { payload }
    }),
    getUserRequest: createAction(`${authSlice.name}/getUserRequest`),

    setLoading: authSlice.actions.setLoading,
    loginSuccess: authSlice.actions.loginSuccess,
    registerSuccess: authSlice.actions.registerSuccess,
    getUserSuccess: authSlice.actions.getUserSuccess,
    resetRegistered: authSlice.actions.resetRegistered,
    logout: authSlice.actions.logout,
}

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectLastRegistered = (state: { auth: AuthState }) => state.auth.lastRegistered;

export default authSlice.reducer;