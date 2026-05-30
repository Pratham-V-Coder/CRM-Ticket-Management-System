import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
