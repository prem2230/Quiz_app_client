import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomizedSnackbarsProps {
  open: boolean;
  setError: () => void;
  setSuccess: () => void;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

export default function CustomizedSnackbars({ open, setError,setSuccess, message, severity }: CustomizedSnackbarsProps) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => {severity === 'success' ? setSuccess() : setError()}}>
        <Alert
          onClose={() =>{ severity === 'success' ? setSuccess() : setError()}}
          severity={severity}
          variant="filled"
          sx={{ 
            width: '100%' ,
            bgcolor: severity === 'error' ? '#fc5c51' : severity === 'warning' ? '#ff9800' : severity === 'info' ? '#2196f3' : '#4caf50',
        }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
