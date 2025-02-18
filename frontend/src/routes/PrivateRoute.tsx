import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const response = await axios.get('/api/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200 && response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };
    
    validateToken();
  }, []);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;