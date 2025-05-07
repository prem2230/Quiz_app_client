import { ReactNode, useEffect } from "react";
import useAuth from "../components/login/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const{ isAuthenticated,token, } = useAuth();
    const location = useLocation();

    useEffect(()=>{
        if(token){
            try{
                const decodedToken :{ exp: number } = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if(decodedToken.exp < currentTime){
                    //logout user
                }
            }catch(error){
                // logout user
            }
        }
    },[token])

  if (!isAuthenticated || !token) {
    return <Navigate to={"/"} state={{ from : location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;