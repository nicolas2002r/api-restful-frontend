import React from "react";
import { Navbar } from "../components/Navbar";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import '../index.css';

export const AgendaDocentePage = () => {
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
      <div className="container">
        <h4>Agenda Docente</h4>
      </div>
      <div className="content-wrapper">
      <Nav variant="tabs" className="aligne-items-center">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/AgendaDocente/labores-academicas">Labores Académicas</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/AgendaDocente/labores-docencia">Labores de Docencia</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/AgendaDocente/labores-docencia">Labores de Docencia</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/AgendaDocente/labores-docencia">Labores de Docencia</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/AgendaDocente/labores-docencia">Labores de Docencia</Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
    </>
  );
};
