import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "./authSlice";
import { getUser, loginUser, registerUser } from "./authBaseApi";
import { snackbarActions } from "../snackbar/snackbarSlice";

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
    role: 'admin' | 'user';
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
            yield put(snackbarActions.onSuccess(response));
        } else {
            yield put(snackbarActions.onError(response))
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(snackbarActions.onError(errMsg || 'Something went wrong'))
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
            yield put(snackbarActions.onSuccess(response));
        } else {
            yield put(snackbarActions.onError(response))
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(snackbarActions.onError(errMsg || 'Something went wrong'))
        console.error("Register failed", error);
    }
}

export function* getUserSaga(): Generator<any, void, { success: boolean; message: string; }> {
    try {
        const response = yield call(getUser);
        if (response.success) {
            yield put(authActions.getUserSuccess(response));
        } else {
            yield put(authActions.logout());
            yield put(snackbarActions.onError(response.message));
        }
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        yield put(authActions.logout());
        yield put(snackbarActions.onError(errMsg || 'Something went wrong'))
        console.error("Get user failed", error);
    }
}

// Root auth watcher saga
export function* authWatcherSaga() {
    yield takeEvery(authActions.loginRequest.type, loginUserSaga);
    yield takeEvery(authActions.registerRequest.type, registerUserSaga);
    yield takeEvery(authActions.getUserRequest.type, getUserSaga);
}