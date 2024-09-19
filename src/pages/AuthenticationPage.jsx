import React from "react";
import { Userform } from "../components/UserForm";



export const AutenticationPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img src="/imagenes/vectorUsuarioAutentication.svg" alt="Vector" style={{ width: "595px" }} />
      </div>
      <div>
        <Userform />
      </div>
    </div>
  );
};
