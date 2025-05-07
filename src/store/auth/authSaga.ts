import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "./authSlice";
import { loginUser, registerUser } from "./authBaseApi";

// Define interfaces for the API response
interface User {
    id: string;
    email: string;
    username: string;
    role: string;
    number: number;
}

interface LoginResponse {
    success: string;
    data: { payload: LoginResponse; type: "auth/loginSuccess"; };
    message: string;
    token: string;
    user: User;
}

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
    role:'admin' | 'user'; 
    number: number | null;
}

interface RegisterResponse {
    success: string;
    message: string;
}

// Saga for handling login
export function* loginUserSaga(
    action: PayloadAction<LoginPayload>
): Generator<any, void, LoginResponse> {
    try {
        const response = yield call(loginUser, action.payload);
        if (response.success) {
            yield put(authActions.loginSuccess(response));
        }else{
            yield put(authActions.loginFailure(response.message));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(authActions.loginFailure(errMsg));
        console.error("Login failed", error);
    }
}

export function* registerUserSaga(
    action: PayloadAction<RegisterPayload>
): Generator<any, void, RegisterResponse> {
    try {
        const response = yield call(registerUser, action.payload);
        if (response.success) {
            yield put(authActions.registerSuccess(response));
        }else{
            yield put(authActions.registerFailure(response.message));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(authActions.registerFailure(errMsg));
        console.error("Register failed", error);
    }
}

// Root auth watcher saga
export function* authWatcherSaga() {
    yield takeEvery(authActions.loginRequest.type, loginUserSaga);
    yield takeEvery(authActions.registerRequest.type, registerUserSaga);
}
