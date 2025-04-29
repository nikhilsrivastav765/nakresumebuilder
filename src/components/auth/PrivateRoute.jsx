import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
export default PrivateRoute;