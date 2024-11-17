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
    "Ingeniería Industrial",
    "Ingeniería Mecatronica",
    "Ingeniería Energias Renovables",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(' https://api-restful-backend.onrender.com/api/usuarios');
      if (!Array.isArray(response.data)) {
        throw new Error('La respuesta no es un arreglo');
      }

      const formattedResult = response.data.map(user => ({
        Id: user.id,
        Nombres: user.nombre,
        Apellidos: user.apellido,
        Cedula: user.dni,
        Correo: user.correo,
        Rol: user.rol.nombre,
        Programas: Array.isArray(user.programasAcademicos)
          ? user.programasAcademicos.map(p => typeof p === 'string' ? { nombre: p } : p)
          : [],
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



  const handleEdit = (index) => {
    const user = data[index];
    setForm({
      Id: user.Id,
      Nombres: user.Nombres,
      Apellidos: user.Apellidos,
      Cedula: user.Cedula,
      Correo: user.Correo,
      Rol: user.Rol,
      Programas: user.Programas.map(p => p.nombre), // Convertir el array de objetos a solo nombres
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
            editIndex={editIndex}
            setEditIndex={setEditIndex} // Nueva prop para actualizar el índice de edición desde RegistrationForm
            availablePrograms={availablePrograms}
            handleProgramChange={handleProgramChange}
            fetchData={fetchData}
            data={data} // Nueva prop para pasar la lista de usuarios a RegistrationForm
          />

        </div>

        <div className="table-column" ref={tableRef}>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Programas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={selectedRowIndex === index ? "selected-row" : ""}
                  onClick={() => {
                    console.log('ID del usuario seleccionado:', item.Id); // Muestra el ID en consola
                    handleEdit(index);
                    setSelectedRowIndex(index);
                  }}
                >
                  <td>{item.Id}</td>
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
                </tr>
              ))}

            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
