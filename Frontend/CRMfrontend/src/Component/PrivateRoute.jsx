import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isAdmin = false, roles = [] }) => {
  const { isAuth: userAuth } = useSelector((state) => state.login);
  const { isAuth: adminAuth } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);

  if (isAdmin) {
    return adminAuth ? children : <Navigate to="/login" replace />;
  }

  if (!userAuth) {
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
