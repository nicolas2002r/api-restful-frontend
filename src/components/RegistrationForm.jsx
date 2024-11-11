import React, { useState, useEffect, useRef } from "react";
import { Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../index.css';

const RegistrationForm = ({
  form,
  handleChange,
  editIndex,
  setEditIndex,
  handleDelete,
  availablePrograms,
  handleProgramChange,
  refreshData,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onProgramSelect = (program) => {
    const programName = typeof program === 'string' ? program : program.nombre;
    if (form.Rol.includes("Docente")) {
      if (form.Programas.includes(programName)) {
        handleProgramChange(form.Programas.filter(p => p !== programName));
      } else {
        handleProgramChange([...form.Programas, programName]);
      }
    } else {
      handleProgramChange([programName]);
      setDropdownOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Configuración del payload con la estructura esperada por la API
    const payload = {
      id: form.Id || 0, // Se incluye el ID solo si es en modo edición
      nombre: form.Nombres,
      apellido: form.Apellidos,
      dni: form.Cedula,
      correo: form.Correo,
      rol: { nombre: form.Rol },
      programasAcademicos: form.Programas.map(program => ({ nombre: program })), // Asumiendo que la API espera esta estructura
    };
  
    try {
      let response;
      if (editIndex !== null) {
        // Si estamos en modo edición, se usa el endpoint de PUT
        response = await axios.put(`http://localhost:8080/api/usuarios/${form.Id}`, payload);
      } else {
        // Si estamos en modo creación, se usa el endpoint de POST
        response = await axios.post('http://localhost:8080/api/usuarios', payload);
      }
  
      // Comprobación del status de la respuesta para confirmar la operación exitosa
      if (response.status === 200 || response.status === 201) {
        // Se obtiene la lista de usuarios actualizada
        const usersResponse = await axios.get('http://localhost:8080/api/usuarios');
        if (Array.isArray(usersResponse.data)) {
          const formattedData = usersResponse.data.map(user => ({
            Nombres: user.nombre,
            Apellidos: user.apellido,
            Cedula: user.dni,
            Correo: user.correo,
            Rol: user.rol.nombre, // Asegurarse que rol tiene un subatributo nombre
            Programas: Array.isArray(user.programasAcademicos)
              ? user.programasAcademicos.map(program => program.nombre)
              : [],
            TipoInvestigador: user.TipoInvestigador || "N/A",
          }));
          refreshData(formattedData); // Actualiza el estado con los datos formateados
        }
        setEditIndex(null); // Reinicia el índice de edición
        Swal.fire({
          icon: 'success',
          title: 'Operación exitosa',
          text: editIndex !== null ? 'El usuario ha sido actualizado correctamente' : 'El usuario ha sido registrado correctamente',
        });
      } else {
        // Si la respuesta no es satisfactoria
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar o actualizar la información',
        });
      }
    } catch (error) {
      // Muestra una alerta en caso de error en el servidor
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'No se pudo completar la operación',
      });
    }
  };  


  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
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
            <option value="Director de Programa">Director de Programa</option>
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
                  {form.Rol.includes("Docente") ? (
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
      </div>

      {/* Mostrar los programas seleccionados */}
      <div className="selected-programs">
          {form.Programas.length > 0 && (
            <ul>
            {form.Programas.map((program, index) => (
              <li key={index}>{typeof program === 'string' ? program : program.nombre}</li>
            ))}
          </ul>          
          )}
        </div>

      <div className="button-container">
        <Button color="success" type="submit" className="me-3">
          {editIndex !== null ? "Guardar cambios" : "Registrar"}
        </Button>
        {editIndex !== null && (
          <Button color="danger" onClick={handleDelete}>
            Eliminar Usuario
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
