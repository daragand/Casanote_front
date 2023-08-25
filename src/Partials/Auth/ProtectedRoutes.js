import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoutes({ children }) {
  const { isSignedIn } = useAuth();

  // Si l'utilisateur est connecté, renvoyer les children (composants protégés)
  if (isSignedIn) {
    return children;
  }

  // Sinon, rediriger vers la page de connexion
  return <Navigate to="/connexion" replace />;
}
