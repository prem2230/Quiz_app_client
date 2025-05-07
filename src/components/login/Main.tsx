import {
  Box,
  Container,
} from '@mui/material';
import { useStyles } from './login.styles';
import Login from './Login';
import { useState } from 'react';
import Register from './Register';


const Main = () => {
  const styles = useStyles();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  return(
    <Box sx={styles.mainContainer}>
      <Container component="main"  sx={{ transition: 'transform 0.6s',
          transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'}} >
            {isLoginMode ? (
              <Box  sx={{
                ...styles.container,
                 transition: 'transform 0.6s',
          transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'}}>
        <Login isLoginMode = {isLoginMode} setIsLoginMode={()=>setIsLoginMode(!isLoginMode)} /> 
        </Box>
        ):(
          <Box sx={{ 
            ...styles.container,
            transition: 'transform 0.6s',
          transform: isLoginMode ? 'rotateY(0deg)' : 'rotateY(180deg)'}}>
          <Register isLoginMode = {isLoginMode} setIsLoginMode={()=>setIsLoginMode(!isLoginMode)} />
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
