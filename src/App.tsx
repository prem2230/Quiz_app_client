import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/navBar/Navbar';
import useAuth from './components/login/hooks';
import ProtectedRoute from './utils/ProtectedRoute';
import { lazy, Suspense } from 'react';
import Loader from './components/loaders/Loader';
import CustomSnackbar from './components/snackBar/SnackBar';

const Home = lazy(() => import('./components/exam/Home'));
const Quiz = lazy(() => import('./components/exam/Quiz'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Results = lazy(() => import('./components/exam/Results'));
const NotFound = lazy(() => import('./components/NotFound'));
const Login = lazy(() => import('./components/login/Main'));
const CreateEditQuestion = lazy(() => import('./components/question/CreateEditQuestion'));
const ViewQuestions = lazy(() => import('./components/question/ViewQuestions'));
const CreateEditQuiz = lazy(() => import('./components/quiz/CreateEditQuiz'));
const ViewQuizzes = lazy(() => import('./components/quiz/ViewQuizzes'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#151414',
      light: '#DAEF4D',
    },
    secondary: {
      main: '#615e5e',
      light: '#EBEBEB',
      dark: '#A1B8BC',
    },
    text: {
      primary: '#151414',
      secondary: '#ffffff',
    },
    background: {
      default: '#FFFFFF'
    }
  },
});

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const { user, isAuthenticated } = useAuth();

  const shouldRedirect = isAuthenticated && isLoginPage;

  const getRedirectPath = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/dashboard' : '/home'
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <CustomSnackbar />
      {!isLoginPage && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1, py: isLoginPage ? 0 : 3 }}>
        <Routes>
          <Route path="/" element={shouldRedirect ? <Navigate to={getRedirectPath()} replace /> : <Suspense fallback={<Loader />}> <Login /> </Suspense>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}> <Suspense fallback={<Loader />}> <Dashboard /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/create-question" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <CreateEditQuestion /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/edit-question/:questionId" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <CreateEditQuestion /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/view-questions" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <ViewQuestions /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/create-quiz" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <CreateEditQuiz /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/edit-quiz/:quizId" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <CreateEditQuiz /></Suspense></ProtectedRoute>}></Route>
          <Route path="/dashboard/view-quizzes" element={<ProtectedRoute allowedRoles={["admin"]} > <Suspense fallback={<Loader />}> <ViewQuizzes /></Suspense></ProtectedRoute>}></Route>
          <Route path="/home" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <Home /> </Suspense></ProtectedRoute>} />
          <Route path="/quiz/:quizId" element={<ProtectedRoute> <Suspense fallback={<Loader />}> <Quiz /> </Suspense></ProtectedRoute>} />
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