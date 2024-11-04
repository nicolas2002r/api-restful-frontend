import React, { useState, useEffect, useRef } from "react";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export const UserRegistrationPage = () => {
  const [data, setData] = useState([]);
  const formRef = useRef(null);  // Referencia al formulario
  const tableRef = useRef(null);  // Referencia a la tabla

  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente de Planta",
    Programas: [],
    TipoInvestigador: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const availablePrograms = [
    "Ingeniería de Sistemas",
    "Ingeniería Electrónica",
    "Ingeniería Ambiental",
    "Ingeniería de Renovables",
    "Ingeniería Industrial"
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuarios');
      if (!Array.isArray(response.data)) {
        throw new Error('La respuesta no es un arreglo');
      }

      const formattedResult = response.data.map(user => ({
        Nombres: user.nombre,
        Apellidos: user.apellido,
        Cedula: user.dni,
        Correo: user.correo,
        Rol: user.rol,
        Programas: Array.isArray(user.programas) ? user.programas : [],
        TipoInvestigador: user.TipoInvestigador || "N/A"
      }));

      setData(formattedResult);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener los datos de los usuarios.',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleProgramChange = (selectedPrograms) => {
    setForm((prevForm) => ({
      ...prevForm,
      Programas: selectedPrograms || [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...form,
      Programas: form.Programas || [],
    };

    try {
      if (editIndex !== null) {
        // Actualización de usuario
        const updatedData = [...data];
        updatedData[editIndex] = userData;
        setData(updatedData);
        setEditIndex(null);
      } else {
        // Agregar nuevo usuario al backend
        const response = await axios.post('http://localhost:8080/api/usuarios', userData);

        // Verificar que la respuesta contiene los datos del nuevo usuario
        if (response && response.data) {
          // Actualizar el estado `data` con el nuevo usuario
          setData([...data, {
            Nombres: response.data.nombre,
            Apellidos: response.data.apellido,
            Cedula: response.data.dni,
            Correo: response.data.correo,
            Rol: response.data.rol,
            Programas: Array.isArray(response.data.programas) ? response.data.programas : [],
            TipoInvestigador: response.data.TipoInvestigador || "N/A"
          }]);
        }
      }
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al guardar el usuario.',
      });
    }

    setForm(initialFormState);
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
    setSelectedRowIndex(index);
  };

  const handleClickOutside = (e) => {
    if (
      formRef.current &&
      tableRef.current &&
      !formRef.current.contains(e.target) &&
      !tableRef.current.contains(e.target)
    ) {
      setEditIndex(null);
      setForm(initialFormState);
      setSelectedRowIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="line-wrapper">
        <h4>{editIndex !== null ? "Editar Usuario" : "Formulario de registro"}</h4>
      </div>
      <div className="content-wrapper">
        <div className="form-column" ref={formRef}>
          <RegistrationForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            availablePrograms={availablePrograms}
            handleProgramChange={handleProgramChange}
          />
        </div>

        <div className="table-column" ref={tableRef}>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Programas</th>
                <th>Investigador</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={selectedRowIndex === index ? "selected-row" : ""}
                  onClick={() => {
                    handleEdit(index);
                    setSelectedRowIndex(index);
                  }}
                >
                  <td>{item.Nombres}</td>
                  <td>{item.Apellidos}</td>
                  <td>{item.Cedula}</td>
                  <td>{item.Correo}</td>
                  <td>{item.Rol}</td>
                  <td>
                    <ul>
                      {Array.isArray(item.Programas) && item.Programas.length > 0
                        ? item.Programas.map((programa, idx) => (
                          <li key={idx}>{programa}</li>
                        ))
                        : <li>Ninguno</li>}
                    </ul>
                  </td>
                  <td>{item.TipoInvestigador || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
