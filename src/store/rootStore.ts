import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { questionSlice } from './questions/questionSlice';
import { snackbarSlice } from './snackbar/snackbarSlice';

export type RootState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
    auth: authSlice.reducer,
    question: questionSlice.reducer,
    snackbar: snackbarSlice.reducer,
});

const rootReducer = (
    state: RootState | undefined,
    action: any
): RootState => {
    return appReducer(state, action);
};

export default rootReducer; 