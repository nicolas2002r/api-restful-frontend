import React, { useState, useEffect, useRef } from "react";
import { Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../index.css';

const RegistrationForm = ({
  form,
  handleChange,
  editIndex,
  setEditIndex, // Nueva prop para actualizar el índice de edición desde RegistrationForm
  availablePrograms,
  handleProgramChange,
  fetchData,
  data, // Nueva prop para pasar la lista de usuarios a RegistrationForm
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

    // Decide si es un registro o actualización según el estado de editIndex
    if (editIndex === null) {
      // Lógica de registro (nuevo usuario)
      const userPayload = {
        id: 0,
        nombre: form.Nombres,
        apellido: form.Apellidos,
        dni: form.Cedula,
        correo: form.Correo,
        rol: {
          id: 0,
          nombre: form.Rol,
        },
        programasAcademicos: form.Programas.map(program => ({
          id: 0,
          nombre: program,
        })),
      };

      try {
        await axios.post(' https://api-restful-backend.onrender.com/api/usuarios', userPayload);
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado correctamente.',
        });
        fetchData();
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al registrar el usuario.',
        });
      }
    } else {
      // Lógica de actualización (usuario existente)
      const userPayload = {
        id: form.Id, // Este es el ID que se debe usar en el PUT
        nombre: form.Nombres,
        apellido: form.Apellidos,
        dni: form.Cedula,
        correo: form.Correo,
        rol: {
          id: 0,
          nombre: form.Rol,
        },
        programasAcademicos: form.Programas.map((program) => ({
          id: 0,
          nombre: program,
        })),
      };
    
      try {
        // Endpoint con el ID dinámico del usuario
        await axios.put(` https://api-restful-backend.onrender.com/api/usuarios/${form.Id}`, userPayload);
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'El usuario ha sido actualizado correctamente.',
        });
        fetchData();  // Refrescar la tabla de usuarios después de la actualización
        setEditIndex(null);  // Resetea editIndex después de la actualización
      } catch (error) {
        console.error('Error al actualizar el usuario:', error.response || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el usuario. Por favor, revisa la consola para más detalles.',
        });
      }
    }
  };


  const handleDelete = async () => {
    if (editIndex === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay un usuario seleccionado para eliminar.',
      });
      return;
    }
  
    try {
      // Intentar eliminar el usuario
      const response = await axios.delete(` https://api-restful-backend.onrender.com/api/usuarios/${form.Id}`);
      console.log('Respuesta del backend:', response);
  
      // Mostrar el mensaje de éxito de eliminación
      await Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
      });
  
      // Llamar a fetchData para actualizar la tabla después de eliminar
      fetchData();
  
      // Limpiar el formulario y resetear el estado de edición
      setForm(initialFormState);
      setEditIndex(null);
  
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.response || error.message);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      {editIndex !== null && ( // Solo muestra el campo ID si estamos en modo edición
        <div className="form-group-custom">
          <label htmlFor="Id">Id</label>
          <div className="input-group-custom">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              name="Id"
              placeholder="Id"
              value={form.Id}
              readOnly // Hace que el campo sea de solo lectura
            />
          </div>
        </div>
      )}
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

      <div className="form-group-custom" ref={dropdownRef}>
        <label>Programas Académicos</label>
        <div className="input-group-custom">
          <button
            type="button"
            className="dropdown-button"
            onClick={toggleDropdown}
            onMouseDown={(e) => e.preventDefault()}
          >
            Seleccionar Programas
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu-custom" onClick={(e) => e.stopPropagation()}>
              {availablePrograms.map((program, index) => (
                <div key={index} className="dropdown-item-custom">
                  {form.Rol.includes("Docente") ? (
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
        <Button
          color="success"
          type="submit"
          className="me-3"
          onClick={editIndex === null ? handleSubmit : undefined}
        >
          {editIndex !== null ? "Guardar cambios" : "Registrar"}
        </Button>
        {editIndex !== null && (
          <Button
            type="button"
            color="danger"
            className="btn-form"
            onClick={() => handleDelete(form.Id)}
          >
            Eliminar Usuario
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
