import {
  Box,
  Container,
} from '@mui/material';
import { useStyles } from './login.styles';
import Login from './Login';
import { useState } from 'react';
import Register from './Register';
import useAuth from './hooks';
import AppLoader from '../loaders/AppLoader';


const Main = () => {
  const styles = useStyles();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { loading } = useAuth();


  return (
    <Box sx={styles.mainContainer}>
      {loading && isLoginMode && <AppLoader message='Logging You In' />}
      <Container component="main" sx={{
        transition: 'transform 0.6s',
        transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'
      }} >
        {isLoginMode ? (
          <Box sx={{
            ...styles.container,
            transition: 'transform 0.6s',
            transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'
          }}>
            <Login isLoginMode={isLoginMode} setIsLoginMode={() => setIsLoginMode(!isLoginMode)} />
          </Box>
        ) : (
          <Box sx={{
            ...styles.container,
            transition: 'transform 0.6s',
            transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'
          }}>
            <Register isLoginMode={isLoginMode} setIsLoginMode={() => setIsLoginMode(!isLoginMode)} />
          </Box>)
        }
      </Container>
      <Container component="main" >
        <Box sx={styles.imageContainer}>
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
