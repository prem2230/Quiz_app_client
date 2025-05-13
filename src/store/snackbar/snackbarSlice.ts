import { createSlice } from "@reduxjs/toolkit"

interface SnackbarProps {
    loading: boolean,
    message: string | null,
    severity: 'error' | 'success' | 'info' | 'warn' | null

}
const initialState: SnackbarProps = {
    loading: false,
    message: null,
    severity: null
}

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        onSuccess: (state, action) => {
            state.message = action.payload.message;
            state.severity = 'success';
        },
        onError: (state, action) => {
            state.message = action.payload.message || action.payload;
            state.severity = 'error';
        },
        onInfo: (state, action) => {
            state.message = action.payload.message;
            state.severity = 'info';
        },
        onWarn: (state, action) => {
            state.message = action.payload.message;
            state.severity = 'warn';
        },
        onReset: (state) => {
            state.message = null;
            state.severity = null;
        }
    }
});

export const snackbarActions = {
    setLoading: snackbarSlice.actions.setLoading,
    onSuccess: snackbarSlice.actions.onSuccess,
    onError: snackbarSlice.actions.onError,
    onInfo: snackbarSlice.actions.onInfo,
    onWarn: snackbarSlice.actions.onWarn,
    onReset: snackbarSlice.actions.onReset
}

export const selectMessage = (state: { snackbar: SnackbarProps }) => state.snackbar.message;
export const selectSeverity = (state: { snackbar: SnackbarProps }) => state.snackbar.severity;

export default snackbarSlice.reducer;