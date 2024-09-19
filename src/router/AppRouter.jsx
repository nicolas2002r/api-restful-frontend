import { Route, Routes, Navigate } from "react-router-dom";
import { AutenticationPage } from "../pages/AuthenticationPage";
import { UserRegistrationPage } from "../pages/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";


export const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta para autenticación */}
      <Route path="/" element={<Navigate to="/Authentication" />} />
      <Route path="/Authentication" element={<AutenticationPage />} />
 
        <Route path="/UserRegistration" element={
          <PrivateRoute>
            <UserRegistrationPage />
          </PrivateRoute>
        } />

    </Routes >
  );
};