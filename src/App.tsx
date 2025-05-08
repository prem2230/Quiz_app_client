import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/navBar/Navbar';
import useAuth from './components/login/hooks';
import ProtectedRoute from './utils/ProtectedRoute';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader';

const Home = lazy(() => import('./components/Home'));
const Quiz = lazy(() => import('./components/Quiz'));
const Results = lazy(() => import('./components/Results'));
const NotFound = lazy(() => import('./components/NotFound'));
const Login = lazy(() => import('./components/login/Main'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#151414',
    },
    secondary: {
      main: '#615e5e',
    },
    text: {
      primary: '#151414',
      secondary: '#ffffff',
    }
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
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Suspense fallback={<Loader />}> <Login /> </Suspense>} />
          <Route path="/home" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <Home /> </Suspense></ProtectedRoute>} />
          <Route path="/quiz/:categoryId" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <Quiz /> </Suspense></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <Results /> </Suspense> </ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <NotFound /> </Suspense> </ProtectedRoute>} />
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