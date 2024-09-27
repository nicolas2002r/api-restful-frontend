import { Route, Routes, Navigate } from "react-router-dom";
import { AutenticationPage } from "../pages/AuthenticationPage";
import { UserRegistrationPage } from "../pages/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";
import { AgendaDocentePage } from "../pages/AgendaDocentePage";
import { MainLayout } from "../layouts/MainLayout";
import { NavbarProvider } from "../context/NavbarContext";
import {RevisionDecanoPage} from "../pages/RevisionDecanoPage";
<<<<<<< HEAD
import {MisAgendasPage} from "../pages/SubPages/MisAgendasPage";
import {RevisionDirectorPage} from "../pages/RevisionDirectorPage";

=======
import { RevisionDirectorProgramapage } from "../pages/RevisionDirectorProgramapage";
>>>>>>> d939b2f67e20aff8a121fd735dc40612b5f2a508

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
        { path: '/AgendaDocente', name: 'Tablero de Agendamiento' },
        { path: '/MisAgendas', name: 'Mis Agendas' }
      ]} /></NavbarProvider>}>
        <Route path="/AgendaDocente" element={
          <PrivateRoute>
            <AgendaDocentePage />
          </PrivateRoute>
        } />
      </Route>

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

      <Route path="/" element={<NavbarProvider><MainLayout links={[
<<<<<<< HEAD
        { path: '/Home', name: 'Home' },
        { path: '/AgendaDocente', name: 'Tablero de Agendamiento' },
        { path: '/MisAgendas', name: 'Mis Agendas' }
      ]} /></NavbarProvider>}>
        <Route path="/MisAgendas" element={
          <PrivateRoute>
            <MisAgendasPage />
          </PrivateRoute>
        } />
      </Route>

      <Route path="/" element={<NavbarProvider><MainLayout links={[
         { path: '/Home', name: 'Home' },
        { path: '/RevisionDirector', name: 'Revision de Agendas' },
      ]} /></NavbarProvider>}>
        <Route path="/RevisionDirector" element={
          <PrivateRoute>
            <RevisionDirectorPage />
=======
        { path: '/Revision', name: 'Revision de Agendas' },
      ]} /></NavbarProvider>}>
        <Route path="/RevisionDirectorPrograma" element={
          <PrivateRoute>
            <RevisionDirectorProgramapage />
>>>>>>> d939b2f67e20aff8a121fd735dc40612b5f2a508
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
};
