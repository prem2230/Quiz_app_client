import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore";
import { authActions } from "../../store/auth/authSlice";

interface LoginPayload{
    email?: string;
    username?: string;
    number?: number;
    password: string;
}

interface RegisterPayload{
    email: string;
    username: string;
    password: string;
    role:'admin'|'user';
    number: number | null;
}

export const useAuth = () =>{
    const dispatch = useAppDispatch();

    return { 
        login: useCallback((payload: LoginPayload) =>{
            dispatch(authActions.loginRequest(payload));
        },[dispatch]),
        setLoading: useCallback((isLoading:boolean ) => {
            dispatch(authActions.setLoading(isLoading));
        },[dispatch]),
        setError: useCallback((error:string) => {
            dispatch(authActions.setError(error));
        },[dispatch]),
        setSuccess: useCallback((success:string) => {
            dispatch(authActions.setSuccess(success));
        },[dispatch]),
        register: useCallback((payload: RegisterPayload) =>{
            dispatch(authActions.registerRequest(payload));
        },[dispatch]),

        user: useAppSelector((state) => state.auth.user),
        isAuthenticated: useAppSelector((state) => state.auth.isAuthenticated),
        loading: useAppSelector((state) => state.auth.loading),
        error: useAppSelector((state) => state.auth.error),
        success: useAppSelector((state) => state.auth.success),
        token: useAppSelector((state) => state.auth.token),
    }
}

export default useAuth;
