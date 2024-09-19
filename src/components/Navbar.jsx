import React from "react";
import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export const Navbar = ({ title }) => {
  return (
    <>
      <NavbarBootstrap expand="lg" className="navbar-custom">
        <Container fluid>
          <NavbarBootstrap.Brand href="#home" className="d-flex align-items-center">
            <img src="/imagenes/LOGO-CORHUILA.png" alt="Logo" className="logo-Navbar d-block my-1" />
          </NavbarBootstrap.Brand>

          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse id="basic-navbar-nav" className="w-100">

            {/* Contendrá lo que exista en UserRegistrationPage */}
            <Nav className="mx-auto justify-content-center align-items-center">
              <span className="nav-center">{title}</span>
            </Nav>

            <Nav>
              <NavDropdown title="Perfil" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/Authentication">Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </NavbarBootstrap.Collapse>
        </Container>
      </NavbarBootstrap>
      <div className="line-wrapper">
        <div className="navbar-separator"></div>
      </div>
    </>
  );
};
