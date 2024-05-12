import React from "react";
import { getUser } from "../../services/userServices";
import { Navigate, Outlet, useLocation } from "react-router-dom";

//This is for protected routes if we directly update anything in URl like /cart, it should not redirect
const ProtectedRoute = () => {
  const location = useLocation();
  return getUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
