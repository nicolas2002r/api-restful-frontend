import React from "react";
import { Userform } from "../components/UserForm";
import vector from "../imagenes/vectorUsuarioAutentication.svg";


export const AutenticationPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img src={vector} alt="Vector" style={{ width: "595px" }} />
      </div>
      <div>
        <Userform />
      </div>
    </div>
  );
};
