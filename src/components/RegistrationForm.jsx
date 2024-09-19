import React from "react";
import { Button } from 'reactstrap';
import '../index.css';

const RegistrationForm = ({ form, handleChange, handleSubmit, editIndex, setEditIndex, handleDelete}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group-custom">
        <label htmlFor="Nombres">Nombres</label>
        <div className="input-group-custom">
          <i className="fas fa-user input-icon"></i>
          <input
            type="text"
            name="Nombres"
            placeholder="Ingresa los nombres"
            value={form.Nombres}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group-custom">
        <label htmlFor="Apellidos">Apellidos</label>
        <div className="input-group-custom">
          <i className="fas fa-user input-icon"></i>
          <input
            type="text"
            name="Apellidos"
            placeholder="Ingresa los apellidos"
            value={form.Apellidos}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group-custom">
        <label htmlFor="Cedula">Cédula</label>
        <div className="input-group-custom">
          <i className="fas fa-id-card input-icon"></i>
          <input
            type="text"
            name="Cedula"
            placeholder="Ingresa la cédula"
            value={form.Cedula}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group-custom">
        <label htmlFor="Correo">Correo</label>
        <div className="input-group-custom">
          <i className="fas fa-envelope input-icon"></i>
          <input
            type="email"
            name="Correo"
            placeholder="Ingresa el correo"
            value={form.Correo}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group-custom">
        <label htmlFor="Rol">Rol</label>
        <div className="input-group-custom">
          <i className="fas fa-briefcase input-icon"></i>
          <select
            name="Rol"
            value={form.Rol}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="Docente">Docente</option>
            <option value="Director">Director</option>
            <option value="Decano">Decano</option>
          </select>
        </div>
      </div>

      <div className="button-container">
        <Button color="success" type="submit" className="me-3">
          {editIndex !== null ? "Guardar cambios" : "Registrar"}
        </Button>
        {editIndex !== null && (
          <Button color="danger" onClick={() => handleDelete(editIndex)}>
            Eliminar Usuario
          </Button>
        )}

      </div>
    </form>
  );
};

export default RegistrationForm;
