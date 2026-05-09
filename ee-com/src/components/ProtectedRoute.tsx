import { Navigate } from "react-router-dom";
import { currentUser } from "../store/userStore";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
