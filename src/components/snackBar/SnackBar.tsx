import React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useSnackbar } from './hooks';

const CustomSnackbar = () => {
    const { snackMessage, severity, setResetSnack } = useSnackbar();

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setResetSnack();
    };
    if (!snackMessage || !severity) {
        return null;
    }

    const alertSeverity = severity === 'warn' ? 'warning' : severity as AlertColor;

    return (
        <Snackbar
            open={!!snackMessage}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={alertSeverity}
                sx={{ width: '100%' }}
                elevation={6}
                variant="filled"
            >
                {snackMessage}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
