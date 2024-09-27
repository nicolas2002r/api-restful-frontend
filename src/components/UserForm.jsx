import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

export const Userform = () => {
  const [formState, setFormState] = useState({
    idNumber: "",
    password: "",
    remember: false,
  });

  const { idNumber, password, remember } = formState;
  const { login } = useAuth(); // Obtiene la función de login del contexto
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejo para el proceso de autenticación (ej: enviar a una API)
    //---->Autenticación por defecto
    //console.log("Número de Identificación:", idNumber);
    //console.log("Contraseña:", password);
    //console.log("Recordarme:", remember);

    // Redirige a UserRegistration después de enviar el formulario
    //----> Autenticación por defecto
    //navigate("/UserRegistration");


    if (idNumber === '1234' && password === '1234') {
      console.log("Autenticado como Administrador");
      login();
      navigate("/UserRegistration");
    } 
    // Autenticación para el rol de Docente (usuario '5678')
    else if (idNumber === '5678' && password === '5678') {
      console.log("Autenticado como Docente");
      login();
      navigate("/AgendaDocente");
<<<<<<< HEAD
    }
    // Autenticación para el rol Director de programa
    else if (idNumber === '9876' && password === '9876') {
      console.log("Autenticado como Director de Programa");
      login();
      navigate("/RevisionDirector"); // Redirige a la vista correspondiente del decano
=======
    } 
    // Autenticación para el rol de Director de Programa (usuario '9876')
    else if (idNumber === '9876' && password === '9876') {
      console.log("Autenticado como Director de Programa");
      login();
      navigate("/RevisionDirectorPrograma"); // Redirige a la vista correspondiente del decano
>>>>>>> d939b2f67e20aff8a121fd735dc40612b5f2a508
    }
    // Autenticación para el rol de Decano (usuario '1111')
    else if (idNumber === '1111' && password === '1111') {
      console.log("Autenticado como Decano");
      login();
      navigate("/RevisionDecano"); // Redirige a la vista correspondiente del decano
    } else {
      alert("Número de identificación o contraseña incorrectos.");
    }

    setFormState({
      idNumber: "",
      password: "",
      remember: false,
    });
  };

  return (
    <div className="position-fixed bottom-0 start-0 p-5 custom-bottom-margin" style={{ width: '30%' }}>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
        <div className="text-center mb-4">
          <img src="/imagenes/LOGO-CORHUILA.png" alt="Logo" style={{ width: "150px" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">
            Número de Identificación
          </label>
          <input
            type="text"
            className="form-control"
            id="idNumber"
            name="idNumber"
            value={idNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="remember"
            name="remember"
            checked={remember}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="remember">
            Recordarme
          </label>
        </div>

        <button type="submit" className="custom-rounded-btn">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
