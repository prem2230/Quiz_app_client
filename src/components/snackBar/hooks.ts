import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configStore"
import { snackbarActions } from "../../store/snackbar/snackbarSlice";
import * as Slice from "../../store/snackbar/snackbarSlice";


export const useSnackbar = () => {
    const dispatch = useAppDispatch();

    return {
        setErrorSnack: useCallback((payload: string) => {
            dispatch(snackbarActions.onError(payload))
        }, [dispatch]),
        setSuccessSnack: useCallback((payload: string) => {
            dispatch(snackbarActions.onSuccess(payload))
        }, [dispatch]),
        setWarnSnack: useCallback((payload: string) => {
            dispatch(snackbarActions.onWarn(payload))
        }, [dispatch]),
        setInfoSnack: useCallback((payload: string) => {
            dispatch(snackbarActions.onInfo(payload))
        }, [dispatch]),
        setResetSnack: useCallback(() => {
            dispatch(snackbarActions.onReset())
        }, [dispatch]),

        snackMessage: useAppSelector(Slice.selectMessage),
        severity: useAppSelector(Slice.selectSeverity),
    }
}