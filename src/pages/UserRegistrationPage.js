import React from "react";
import { Navbar } from "../components/Navbar";

export const UserRegistrationPage = () => {
  return (
    <>

      {/* Titulo de la Navbar */}
      <Navbar title="REGISTRO DE USUARIOS" />
      {/*Fondo de la vista*/}
      <div className="background-container">
        <div className="content-container">
          <div className="line-wrapper">
            <h4>Registro de usuario</h4>
          </div>
        </div>
      </div>
    </>
  );
};
