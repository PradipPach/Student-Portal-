import { Navigate } from "react-router-dom";

// If there is no token, send the user back to the login page
export default function ProtectedRoute({ pageToProtect }) {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return pageToProtect;
}
