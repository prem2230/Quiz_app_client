import { ReactNode, useEffect } from "react";
import useAuth from "../components/login/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/" }: ProtectedRouteProps) => {
  const { user, isAuthenticated, token, logout, getUser } = useAuth();
  const location = useLocation();
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken && !isAuthenticated) {
      getUser();
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

  if (!localToken || !isAuthenticated || !token) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  console.log('adsadad', allowedRoles, user, allowedRoles?.includes(user?.role ?? ""), redirectTo)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === 'admin' ? '/dashboard' : '/home';
    return <Navigate to={redirectTo || redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;