import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAdmin = false, roles = [] }) => {
  const { isAuth: userAuth } = useSelector((state) => state.login);
  const { isAuth: adminAuth } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  if (isAdmin) {
    const adminData = localStorage.getItem("admin");
    const adminToken = localStorage.getItem("accessJWT");
    const isAdminLoggedIn = adminAuth || (adminData && adminToken);
    return isAdminLoggedIn ? children : <Navigate to="/login" replace />;
  }

  const accessJWT =
    sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");
  const userData = localStorage.getItem("user");
  const userLoggedIn = userAuth || (accessJWT && userData);

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && user?.role) {
    if (!roles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
