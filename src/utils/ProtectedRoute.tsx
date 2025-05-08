import { ReactNode, useEffect } from "react";
import useAuth from "../components/login/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, token, logout, getUser } = useAuth();
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

  return <>{children}</>;
};

export default ProtectedRoute;