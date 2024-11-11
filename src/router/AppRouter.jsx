import { Route, Routes, Navigate } from "react-router-dom";
import { AutenticationPage } from "../pages/AuthenticationPage";
import { UserRegistrationPage } from "../pages/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";
import { AgendaDocentePage } from "../pages/AgendaDocentePage";
import { MainLayout } from "../layouts/MainLayout";
import { NavbarProvider } from "../context/NavbarContext";
import { RevisionDecanoPage } from "../pages/RevisionDecanoPage";
import { MisAgendasPage } from "../pages/SubPages/MisAgendasPage";
import { RevisionDirectorPage } from "../pages/RevisionDirectorPage";
import { Prueba } from "../pages/prueba";
import { HomeDocente } from "../pages/SubPages/HomeDocente";
import { HomeDirectorPrograma } from "../pages/SubPages/HomeDirectorPrograma";

export const AppRouter = () => {
  return (
    <Routes>
      {/*Rutas Publicas*/}
      <Route path="/" element={<Navigate to="/Authentication" />} />
      <Route path="/Authentication" element={<AutenticationPage />} />

      <Route path="/Pruebas" element={< Prueba />} />

      {/*Rutas de administrador*/}
      <Route path="/" element={<NavbarProvider><MainLayout title="REGISTRO DE USUARIO" links={[]} /></NavbarProvider>}>
        <Route path="/UserRegistration" element={
          <PrivateRoute>
            <UserRegistrationPage />
          </PrivateRoute>
        } />
      </Route>


      {/*Rutas Agenda docente*/}
      <Route path="/" element={<NavbarProvider><MainLayout links={[
        { path: '/HomeDocente', name: 'Home' },
        { path: '/AgendaDocente', name: 'Tablero de Agendamiento' },
        { path: '/MisAgendas', name: 'Mis Agendas' }
      ]} /></NavbarProvider>}>
        <Route path="/HomeDocente" element={
          <PrivateRoute>
            <HomeDocente />
          </PrivateRoute>
        } />
        <Route path="/AgendaDocente" element={
          <PrivateRoute>
            <AgendaDocentePage />
          </PrivateRoute>
        } />
        <Route path="/MisAgendas" element={
          <PrivateRoute>
            <MisAgendasPage />
          </PrivateRoute>
        } />
      </Route>

      {/*Rutas Decano*/}
      <Route path="/" element={<NavbarProvider><MainLayout links={[
        { path: '/Home', name: 'Home' },
        { path: '/RevisionDecano', name: 'Revision de Agendas' },
      ]} /></NavbarProvider>}>
        <Route path="/RevisionDecano" element={
          <PrivateRoute>
            <RevisionDecanoPage />
          </PrivateRoute>
        } />
      </Route>
      {/*Rutas Director de Programa */}
      <Route path="/" element={<NavbarProvider><MainLayout links={[
        { path: '/HomeDirector', name: 'Home' },
        { path: '/RevisionDirector', name: 'Revision de Agendas' },
      ]} /></NavbarProvider>}>
        <Route path="/RevisionDirector" element={
          <PrivateRoute>
            <RevisionDirectorPage />
          </PrivateRoute>
        } />

        <Route path="/HomeDirector" element={
          <PrivateRoute>
            <HomeDirectorPrograma />
          </PrivateRoute>
        } />
      </Route>

    </Routes>
  );
};
