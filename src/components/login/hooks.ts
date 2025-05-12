import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore";
import * as Slice from "../../store/auth/authSlice";
import { authActions } from "../../store/auth/authSlice";

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

export const useAuth = () => {
    const dispatch = useAppDispatch();

    return {
        login: useCallback((payload: LoginPayload) => {
            dispatch(authActions.loginRequest(payload));
        }, [dispatch]),
        setLoading: useCallback((isLoading: boolean) => {
            dispatch(authActions.setLoading(isLoading));
        }, [dispatch]),
        setError: useCallback((error: string) => {
            dispatch(authActions.setError(error));
        }, [dispatch]),
        setSuccess: useCallback((success: string) => {
            dispatch(authActions.setSuccess(success));
        }, [dispatch]),
        register: useCallback((payload: RegisterPayload) => {
            dispatch(authActions.registerRequest(payload));
        }, [dispatch]),
        getUser: useCallback(() => {
            dispatch(authActions.getUserRequest());
        }, [dispatch]),
        logout: useCallback(() => {
            dispatch(authActions.logout());
        }, [dispatch]),

        user: useAppSelector(Slice.selectUser),
        isAuthenticated: useAppSelector(Slice.selectIsAuthenticated),
        loading: useAppSelector(Slice.selectAuthLoading),
        error: useAppSelector(Slice.selectAuthError),
        success: useAppSelector(Slice.selectAuthSuccess),
        token: useAppSelector(Slice.selectAuthToken),
    }
}

export default useAuth;
