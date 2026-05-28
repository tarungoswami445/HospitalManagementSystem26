import { Navigate } from "react-router-dom";

import {
  getToken,
  getRole
} from "../auth/authUtils";

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {

  const token = getToken();

  const role = getRole();

  // NO TOKEN

  if (!token) {

    return <Navigate to="/login" />;
  }

  // ROLE CHECK

  if (!allowedRoles.includes(role)) {

    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;