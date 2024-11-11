import React, { useState, useEffect, useRef } from "react";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export const UserRegistrationPage = () => {
  const [data, setData] = useState([]);
  const formRef = useRef(null);
  const tableRef = useRef(null);

  const refreshData = (newData) => {
    setData(newData);
  };

  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente de Planta",
    Programas: [],
    TipoInvestigador: "",
    Id: null,
  };

  const [form, setForm] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const availablePrograms = [
    "Ingeniería de Sistemas",
    "Ingeniería Industrial",
    "Ingeniería Mecatronica",
    "Ingeniería Energias Renovables",
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
        Rol: user.rol.nombre,
        Programas: Array.isArray(user.programasAcademicos)
          ? user.programasAcademicos.map(p => typeof p === 'string' ? { nombre: p } : p)
          : [],
        TipoInvestigador: user.TipoInvestigador || "N/A",
        Id: user.id, 

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
  const handleDelete = async () => {
    if (form.Id === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario no seleccionado',
        text: 'Por favor, selecciona un usuario para eliminar.',
      });
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/usuarios/${form.Id}`);
      setData(data.filter(user => user.Id !== form.Id)); // Actualiza la lista sin el usuario eliminado
      setForm({
        Nombres: "",
        Apellidos: "",
        Cedula: "",
        Correo: "",
        Rol: "Docente de Planta",
        Programas: [],
        TipoInvestigador: "",
        Id: null,
      });
      setEditIndex(null);
      Swal.fire({
        icon: 'success',
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
      });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el usuario.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...form,
      Programas: form.Programas || [],
    };

    try {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = userData;
        setData(updatedData);
        setEditIndex(null);
      } else {
        const response = await axios.post('http://localhost:8080/api/usuarios', userData);
        if (response && response.data) {
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
    const user = data[index];
    setForm({
      Nombres: user.Nombres,
      Apellidos: user.Apellidos,
      Cedula: user.Cedula,
      Correo: user.Correo,
      Rol: user.Rol,
      Programas: user.Programas.map(p => p.nombre), // Convertir el array de objetos a solo nombres
      Id: user.id, 
    });
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
            availablePrograms={availablePrograms}
            handleProgramChange={handleProgramChange}
            refreshData={refreshData}
            handleDelete={handleDelete}
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
                          <li key={idx}>{programa.nombre ? programa.nombre : "Nombre no disponible"}</li>
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
