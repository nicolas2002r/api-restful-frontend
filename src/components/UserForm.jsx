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
    
    // Autenticación de prueba: si idNumber y password son '1234', redirige a UserRegistration
    if (idNumber === '1234' && password === '1234') {
      console.log("Número de Identificación:", idNumber);
      console.log("Contraseña:", password);
      console.log("Recordarme:", remember);

      // Realiza el login en el contexto
      login();

      // Redirige a UserRegistration después de la autenticación de prueba
      navigate("/UserRegistration");
    } else {
      // Manejo de autenticación fallida (puedes mostrar un mensaje de error aquí)
      alert("Número de identificación o contraseña incorrectos.");
    }
    // Resetea el estado del formulario
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

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
