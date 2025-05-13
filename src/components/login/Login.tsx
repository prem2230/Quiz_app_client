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

  const validateAndGetPayload = (identifier: string, password: string) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberPattern = /^\d+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    try {
      if (!identifier || !password) {
        throw new Error('Please fill in all fields.');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (emailPattern.test(identifier)) {
        return { email: identifier, password };
      }

      if (numberPattern.test(identifier)) {
        if (identifier.length !== 10) {
          throw new Error('Please enter a valid phone number.');
        }
        return { number: Number(identifier), password };
      }

      if (usernamePattern.test(identifier)) {
        return { username: identifier, password };
      }

      throw new Error('Please enter a valid email, number, or username.');
    } catch (error: any) {
      setErrorSnack(error);
    }
  }

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
      const payload = validateAndGetPayload(formData.identifier, formData.password);
      if (!payload) return;
      await login(payload);
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
