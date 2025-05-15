import { ReactNode, useEffect, useState } from "react";
import useAuth from "../components/login/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppLoader from "../components/loaders/AppLoader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/" }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated, token, logout, getUser } = useAuth();
  const location = useLocation();
  const localToken = localStorage.getItem("token");
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (localToken) {
        try {
          getUser();
        } catch (error) {
          console.error("Auth verification failed", error);
        } finally {
          setIsVerifying(false);
        }
      } else {
        setIsVerifying(false);
      }
    }

    if (!isAuthenticated && localToken) {
      verifyAuth();
    } else {
      setIsVerifying(false);
    }

  }, [isAuthenticated, localToken]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  }, [token])

  if (isVerifying || loading) {
    return <AppLoader message="Loading your profile" />;
  }

  if (!isVerifying && (!localToken || !isAuthenticated || !token)) {
    return <Navigate to={"/"} state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === 'admin' ? '/dashboard' : '/home';
    return <Navigate to={redirectTo || redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;