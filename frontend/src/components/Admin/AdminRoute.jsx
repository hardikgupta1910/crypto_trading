import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { auth } = useSelector((store) => store);

  // If the user's role is 'ROLE_ADMIN', render the child component (using <Outlet />).
  // Otherwise, redirect them to the home page.
  return auth.user?.role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
