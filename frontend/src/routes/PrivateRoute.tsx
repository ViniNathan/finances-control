import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;