import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
    id: string;
    email:string;
    username: string;
    role:string,
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
    error: string | null;
    success: string | null;
    token: string | null;
}

interface RegisterResponse{
    success: string;
    message: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false, 
    error: null,
    success: null,
    token: null,    
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        loginSuccess: (state, action:PayloadAction<LoginResponse>) => {
           state.isAuthenticated = true;
           state.user = action.payload.user;
           state.token = action.payload.token;
           state.loading = false;
           state.success = action.payload.message;
           state.error = null;
           localStorage.setItem('token', action.payload.token);
        },
        registerSuccess: (state, action:PayloadAction<RegisterResponse>) => {
            state.loading = false;
            state.success = action.payload.message;
            state.error = null;
        },
        setSuccess:(state,action)=>{
            state.success = action.payload;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
})

export const authActions = {
    loginRequest: createAction(`${authSlice.name}/loginRequest`,(payload) => {
        return {payload}
    }),
    registerRequest: createAction(`${authSlice.name}/registerRequest`,(payload) => {
        return {payload}
    }),
    
    setLoading: authSlice.actions.setLoading,
    setError: authSlice.actions.setError,
    loginSuccess: authSlice.actions.loginSuccess,
    registerSuccess: authSlice.actions.registerSuccess,
    setSuccess: authSlice.actions.setSuccess,
    loginFailure: authSlice.actions.loginFailure,
    registerFailure: authSlice.actions.registerFailure,
    logout: authSlice.actions.logout,
}

export const selectAuth = (state : {auth:AuthState}) => state.auth.loading;   
export const selectUser = (state : {auth:AuthState}) => state.auth.user;
export const SelectIsAuthenticated = (state : {auth:AuthState}) => state.auth.isAuthenticated;
export const SelectAuthLoading = (state : {auth:AuthState}) => state.auth.loading;
export const SelectAuthError = (state : {auth:AuthState}) => state.auth.error;
export const selectAuthSuccess = (state : {auth:AuthState}) => state.auth.success;

export default authSlice.reducer;