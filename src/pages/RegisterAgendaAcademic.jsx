import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import '../index.css';
import {ModuleTeachingWork} from '../components/ModuleTeachingWork';

export const RegisterAgendaAcademic = () => {
  // Estado para manejar la pestaña activa
  const [key, setKey] = useState('docencia');

  // Items de la Navbar
  const customItems = (
    <>
      <Nav.Link className="nav-item-custom">
        Casa
      </Nav.Link>
      <Nav.Link as={NavLink} to="/tablero-agendamiento" className="nav-item-custom">
        Tablero de agendamiento
      </Nav.Link>
      <Nav.Link as={NavLink} to="/mis-agendas" className="nav-item-custom">
        Mis agendas
      </Nav.Link>
    </>
  );

  return (
    <>
      <div className="container mt-4">
        <h4>Agenda Docente</h4>
        {/* Contenedor para hacer las pestañas desplazables horizontalmente si es necesario */}
        <div className="overflow-auto">
          <Tabs
            id="agenda-docente-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 custom-tabs flex-nowrap"
            variant="tabs" // Puedes cambiar a 'pills' si lo prefieres
          >
            <Tab eventKey="docencia" title="Labores de Docencia">
              <div className="mt-3">
                <h5>Labores de Docencia</h5>
                <ModuleTeachingWork />
              </div>
            </Tab>
            <Tab eventKey="academicas" title="Labores Académicas y Formativas">
              <div className="mt-3">
                <h5>Labores Académicas y Formativas</h5>
                <p>Aquí va la información relacionada con las labores académicas y formativas.</p>
              </div>
            </Tab>
            <Tab eventKey="cientificas" title="Labores Científicas">
              <div className="mt-3">
                <h5>Labores Científicas</h5>
                <p>Aquí va la información relacionada con las labores científicas.</p>
              </div>
            </Tab>
            <Tab eventKey="extension" title="Labores de Extensión y Culturales">
              <div className="mt-3">
                <h5>Labores de Extensión y Culturales</h5>
                <p>Aquí va la información relacionada con las labores de extensión y culturales.</p>
              </div>
            </Tab>
            <Tab eventKey="gestion" title="Gestión Académicas y Administrativas">
              <div className="mt-3">
                <h5>Actividades de Gestión Académicas y Administrativas</h5>
                <p>Aquí va la información relacionada con las actividades de gestión académicas y administrativas.</p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
