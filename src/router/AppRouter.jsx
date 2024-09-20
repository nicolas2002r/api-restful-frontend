import { Route, Routes, Navigate } from "react-router-dom";
import { AutenticationPage } from "../pages/AuthenticationPage";
import { UserRegistrationPage } from "../pages/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";
import { AgendaDocentePage } from "../pages/AgendaDocentePage";
import { MainLayout } from "../layouts/MainLayout";
import { NavbarProvider } from "../context/NavbarContext";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Authentication" />} />
      <Route path="/Authentication" element={<AutenticationPage />} />

      <Route path="/" element={<NavbarProvider><MainLayout title="REGISTRO DE USUARIO" links={[]} /></NavbarProvider>}>
        <Route path="/UserRegistration" element={
          <PrivateRoute>
            <UserRegistrationPage />
          </PrivateRoute>
        } />
      </Route>

      <Route path="/" element={<NavbarProvider><MainLayout links={[
        { path: '/Home', name: 'Home' },
        { path: '/Tablero', name: 'Tablero de Agendamiento' },
        { path: '/MisAgendas', name: 'Mis Agendas' }
      ]} /></NavbarProvider>}>
        <Route path="/AgendaDocente" element={
          <PrivateRoute>
            <AgendaDocentePage />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
};
