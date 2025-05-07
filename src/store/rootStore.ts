import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';

export type RootState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
    auth: authSlice.reducer,
});

const rootReducer = (
    state:RootState | undefined,
    action:any
) : RootState => {
    return appReducer(state, action);
};

export default rootReducer; 