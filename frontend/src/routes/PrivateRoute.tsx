import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { authService } from "../services/authService";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const isValid = await authService.validateToken();
        setIsAuthenticated(isValid);
        if (!isValid) {
          authService.logout();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsAuthenticated(false);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    validateToken();
  }, []);

  if (isLoading) {
    return <div className="h-[100dvh] w-screen flex justify-center items-center bg-bg">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;