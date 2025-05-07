import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import NotFound from './components/NotFound';
import Login from './components/login/Main';
import useAuth from './components/login/hooks';
import ProtectedRoute from './utils/ProtectedRoute';

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
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {!isLoginPage && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1, py: isLoginPage ? 0 : 3 }}>
        <Routes>
          <Route path="/" element={ isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/quiz/:categoryId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
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