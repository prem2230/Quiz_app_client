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
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import {
    LockOpen,
    LockOutline,
} from '@mui/icons-material';
import useAuth from './hooks';
import { useStyles } from './login.styles';
import { useSnackbar } from '../snackBar/hooks';
import { registerPayloadValidator } from '../../utils';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: 'admin' | 'user';
    number: number | null;
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
    const { setErrorSnack } = useSnackbar();
    const { register, loading, setLoading } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        number: null as number | null,
    });
    const [showPassword, setShowPassword] = useState<showPasswordProps>({
        password: false,
        confirmPassword: false,
    });

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
            const validation = registerPayloadValidator(formData);

            if (!validation.isValid) {
                setErrorSnack(validation.errorMessage || 'Invalid Registration Data');
                return;
            }
            if (!validation.payload) return;
            register(validation.payload);
        } catch (error: any) {
            setErrorSnack(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (type: 'password' | 'cPassword') => {
        setShowPassword(prev => ({
            ...prev,
            password: type === 'password' ? !prev.password : prev.password,
            confirmPassword: type === 'cPassword' ? !prev.confirmPassword : prev.confirmPassword,
        })
        );
    }

    // React.useEffect(() => {
    //     if (success && !error) {
    //         setIsLoginMode();
    //     }
    // }, [success, error]) // need to fix

    return (
        <Box sx={styles.formContainer}>
            <Paper
                elevation={3}
                sx={styles.formPaper}
            >
                <Typography component="h1" variant="h5" my={3} textAlign={"center"}>
                    {'Create an Account ! '}
                </Typography>
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
                        // error={!!error} // need to fix
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
                        // error={!!error} // need to fix
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
                        // error={!!error} // need to fix
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
                            // error={!!error} // need to fix
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('password')}
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
                            // error={!!error} // need to fix
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('cPassword')}
                                            edge="end"
                                        >
                                            {showPassword?.confirmPassword ? <LockOutline /> : <LockOpen />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ToggleButtonGroup
                            color="primary"
                            value={formData?.role}
                            exclusive
                            onChange={(_e, newRole) => {
                                if (newRole !== null) {
                                    setFormData(prev => ({
                                        ...prev,
                                        role: newRole as 'user' | 'admin'
                                    }));
                                }
                            }}
                            aria-label="user role"
                            sx={styles.toggleBox}
                        >
                            <ToggleButton
                                value="user"
                                disableRipple
                                sx={{ ...styles.toggleBtn }}
                            >
                                User
                            </ToggleButton>
                            <ToggleButton
                                value="admin"
                                disableRipple
                                sx={{ ...styles.toggleBtn }}
                            >
                                Admin
                            </ToggleButton>
                            <Box
                                sx={{
                                    ...styles.toggleActiveBox,
                                    left: formData.role === 'user' ? '3px' : 'calc(50% - 3px)'
                                }}
                            />
                        </ToggleButtonGroup>

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
                            <Typography variant="body2" color="text.primary" fontSize={'0.8em'}>
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
