// RegistrationForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { Button } from 'reactstrap';
import '../index.css';

const RegistrationForm = ({
  form,
  handleChange,
  handleSubmit,
  editIndex,
  setEditIndex,
  handleDelete,
  availablePrograms, // Recibir programas disponibles como prop
  handleProgramChange, // Recibir manejador de programas como prop
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Manejar clics fuera del dropdown para cerrarlo
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Alternar el estado del dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Manejar la selección de programas
  const onProgramSelect = (program) => {
    if (form.Rol === "Docente") {
      // Para Docentes, manejar múltiples selecciones
      if (form.Programas.includes(program)) {
        handleProgramChange(form.Programas.filter(p => p !== program));
      } else {
        handleProgramChange([...form.Programas, program]);
      }
    } else {
      // Para Director y Decano, una única selección
      handleProgramChange([program]);
      setDropdownOpen(false); // Cerrar el dropdown después de la selección
    }
  };

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

      {/* Lista Desplegable para Programas Académicos */}
      <div className="form-group-custom" ref={dropdownRef}>
        <label>Programas Académicos</label>
        <div className="input-group-custom">
          <button
            type="button"
            className="dropdown-button"
            onClick={toggleDropdown}
            onMouseDown={(e) => e.preventDefault()} // Evita perder el foco del botón
          >
            Seleccionar Programas
          </button>
          {dropdownOpen && (
            <div
              className="dropdown-menu-custom"
              onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic
            >
              {availablePrograms.map((program, index) => (
                <div key={index} className="dropdown-item-custom">
                  {form.Rol === "Docente" ? (
                    // Para Docentes, checkboxes para múltiples selecciones
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id={`program-checkbox-${index}`}
                        name="Programas"
                        value={program}
                        checked={form.Programas.includes(program)}
                        onChange={() => onProgramSelect(program)}
                      />
                      <label htmlFor={`program-checkbox-${index}`}>{program}</label>
                    </div>
                  ) : (
                    // Para Director y Decano, radio buttons para una única selección
                    <div className="radio-group">
                      <input
                        type="radio"
                        id={`program-radio-${index}`}
                        name="Programas"
                        value={program}
                        checked={form.Programas.includes(program)}
                        onChange={() => onProgramSelect(program)}
                      />
                      <label htmlFor={`program-radio-${index}`}>{program}</label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Mostrar los programas seleccionados */}
        <div className="selected-programs">
          {form.Programas.length > 0 && (
            <ul>
              {form.Programas.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          )}
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
