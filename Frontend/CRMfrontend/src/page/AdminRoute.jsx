import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { admin, isAuth } = useSelector((state) => state.admin);

  // not logged in
  if (!isAuth || !admin?._id) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (admin.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
