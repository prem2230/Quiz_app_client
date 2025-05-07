import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import NotFound from './components/NotFound';
import Login from './components/login/Main';

const theme = createTheme({
  palette: {
    primary: {
      main: '#151414',
    },
    secondary: {
      main: '#615e5e',
    },
  },
});

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {!isLoginPage && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1, py: isLoginPage ? 0 : 3 }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/quiz/:categoryId" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;