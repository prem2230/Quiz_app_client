import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  LockOpen,
  LockOutline,
} from '@mui/icons-material';
import useAuth from './hooks';
import { useStyles } from './login.styles';
import { useSnackbar } from '../snackBar/hooks';
import { loginPayloadValidator } from '../../utils';

interface LoginFormData {
  identifier: string;
  password: string;
}

interface LoginProps {
  isLoginMode: boolean;
  setIsLoginMode: () => void;
}

const Login = ({ setIsLoginMode }: LoginProps) => {

  const styles = useStyles();
  const { setErrorSnack } = useSnackbar();
  const { login, loading, setLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const validation = loginPayloadValidator(formData.identifier, formData.password)
      if (!validation.isValid) {
        setErrorSnack(validation.errorMessage || 'Invalid Credentials');
        return;
      }
      if (!validation.payload) return;
      login(validation.payload);
    } catch (error: any) {
      setErrorSnack(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <Box sx={styles.formContainer}>
      <Typography component="h1" variant="h5">
        {'Ready to get started? '}
      </Typography>
      <Paper
        elevation={3}
        sx={styles.formPaper}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              sx={styles.formField}
              required
              fullWidth
              id="identifier"
              label="Email or Username or Phone Number"
              name="identifier"
              autoComplete="identifier"
              autoFocus
              value={formData.identifier}
              onChange={handleInputChange}
            // error={!!error} // need to fix
            />

            <TextField
              sx={styles.formField}
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              // error={!!error} // need to fix
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <LockOutline /> : <LockOpen />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={styles.button}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Box>
              <Typography variant="body2" color="text.primary">
                Don't have an account? <Link onClick={() => setIsLoginMode()} variant="body2" sx={{ cursor: 'pointer' }} >Register here !</Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
