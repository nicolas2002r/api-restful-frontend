import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige al usuario a la página de Autentication
  if (!isAuthenticated) {
    return <Navigate to="/Authentication" />;
  }

  // Si está autenticado, renderiza el componente hijo
  return children;
};

export default PrivateRoute;
