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
import CustomizedSnackbars from '../snackBar/SnackBar';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: 'admin' | 'user';
    number?: number | null;
}

interface LoginProps {
    isLoginMode: boolean;
    setIsLoginMode: () => void;
}

interface showPasswordProps {
    password: boolean;
    confirmPassword: boolean;
}

const Register = ({ setIsLoginMode }: LoginProps) => {

    const styles = useStyles();
    const { register, loading, setLoading, error, setError, success, setSuccess } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        number: null,
    });
    const [showPassword, setShowPassword] = useState<showPasswordProps>({
        password: false,
        confirmPassword: false,
        });

    const validateAndGetPayload = (formData: RegisterFormData) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberPattern = /^\d+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    try {
      if (!formData?.username || !formData?.email || !formData?.number || !formData?.password || !formData?.confirmPassword) {
        throw new Error('Please fill in all fields.');
      }

      if (formData?.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!emailPattern.test(formData?.email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (formData?.number !==null) {
        if(!numberPattern.test(String(formData?.number))) {
            throw new Error('Phone number must contain only digits.');
        }
        if (String(formData?.number).length !== 10) {
          throw new Error('Please enter a valid 10-digit phone number.');
        }
      }

      if (!usernamePattern.test(formData?.username)) {
        throw new Error('Username can only contain letters, numbers, and underscores.');
      }

      if(formData?.password !== formData?.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      return {
        email: formData?.email,
        username: formData?.username,
        password: formData?.password,
        role: formData?.role,
        number: formData?.number ? Number(formData?.number) : null,
      }
    } catch (error: any) {
      setError(error.message);
    }
  }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        setLoading(true);
        try {
            const payload = validateAndGetPayload(formData);
            if (!payload) return;
            await register(payload);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (type: 'password' | 'cPassword') => {
        setShowPassword(prev => ({
            ...prev,
            password: type ==='password' ? !prev.password : prev.password ,
            confirmPassword: type ==='cPassword' ? !prev.confirmPassword : prev.confirmPassword,
        })
          );
    }

    React.useEffect(() => {
        if(success && !error){
            setIsLoginMode();
        }
    },[success,error])

    return (
        <Box sx={styles.formContainer}>
            <Typography component="h1" variant="h5">
                {'Create an Account ! '}
            </Typography>
            <Paper
                elevation={3}
                sx={styles.formPaper}
            >
                <CustomizedSnackbars
                    open={!!error || !!success}
                    setSuccess={() => setSuccess('')}
                    setError={() => setError('')}
                    message={error || success || ''}
                    severity={!!error ? "error" : "success"}
                />
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={3}>
                        <TextField
                            sx={styles.formField}
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!error}
                        />

                        <TextField
                            sx={styles.formField}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            error={!!error}
                        />
                        <TextField
                            sx={styles.formField}
                            required
                            fullWidth
                            id='number'
                            label="Phone Number"
                            name="number"
                            autoComplete="number"
                            value={formData.number || ''}
                            onChange={handleInputChange}
                            error={!!error}
                        />

                        <TextField
                            sx={styles.formField}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword?.password ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!error}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>togglePasswordVisibility('password')}
                                            edge="end"
                                        >
                                            {showPassword?.password ? <LockOutline /> : <LockOpen />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            sx={styles.formField}
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showPassword?.confirmPassword ? 'text' : 'password'}
                            autoComplete="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            error={!!error}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>togglePasswordVisibility('cPassword')}
                                            edge="end"
                                        >
                                            {showPassword?.confirmPassword ? <LockOutline /> : <LockOpen />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

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
                                'Sign Up'
                            )}
                        </Button>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account? <Link onClick={() => setIsLoginMode()} variant="body2" sx={{ cursor: 'pointer' }} >Login here !</Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
