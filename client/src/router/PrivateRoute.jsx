import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

// This component checks if the user is authenticated before allowing access to certain routes.
// If the user is not authenticated, they are redirected to the login page.
const PrivateRoute = () => {
  const user = useAuth().curUser;
  console.log("PrivateRoute user: ", user);
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
