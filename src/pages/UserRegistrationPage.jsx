// UserRegistrationPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';
import { MainLayout } from "../layouts/MainLayout";

// Se define el componente
export const UserRegistrationPage = () => {
  // Lista de programas académicos disponibles
  const availablePrograms = [
    "Ing. Sistemas",
    "Ing. Industrial",
    "Ing. Ambiental",
    "Ing. Mecatronica",
    "Ing. Renovables"
  ];

  const [data, setData] = useState([
    {
      Nombres: "Jesus",
      Apellidos: "Ariel Gonzaless",
      Cedula: "12312312",
      Correo: "jesus.gonzales@corhuila.edu.co",
      Rol: "Docente de Planta",
      Programas: ["Ing. Renovables", "Ing. Sistemas"], // Añadido Programas
    },
    {
      Nombres: "Maria",
      Apellidos: "Lopez",
      Cedula: "98765432",
      Correo: "maria.lopez@corhuila.edu.co",
      Rol: "Director",
      Programas: ["Ing. Renovables"], // Solo un programa
    },
    {
      Nombres: "Carlos",
      Apellidos: "Perez",
      Cedula: "56789012",
      Correo: "carlos.perez@corhuila.edu.co",
      Rol: "Decano",
      Programas: ["Ing. Sistemas"], // Solo un programa
    },
    {
      Nombres: "Ana",
      Apellidos: "Martinez",
      Cedula: "34567890",
      Correo: "ana.martinez@corhuila.edu.co",
      Rol: "Docente de Medio Tiempo",
      Programas: ["Ing. Ambiental"], // Solo un programa
    },
  ]);

  // Estado inicial del formulario (campos vacíos)
  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente",
    Programas: [], // Añadido Programas
  };

  // Estado para controlar el formulario
  const [form, setForm] = useState(initialFormState);
  // Índice de la fila que se está editando
  const [editIndex, setEditIndex] = useState(null);

  // Referencia para el formulario y la tabla
  const formRef = useRef(null);
  const tableRef = useRef(null);

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Si se cambia el rol y no es "Docente", limpiar los programas seleccionados
    if (name === "Rol" && value !== "Docente") {
      setForm((prevForm) => ({
        ...prevForm,
        Programas: [],
      }));
    }
  };

  // Función para manejar cambios en los programas (checkboxes o select)
  const handleProgramChange = (selectedPrograms) => {
    setForm((prevForm) => ({
      ...prevForm,
      Programas: selectedPrograms,
    }));
  };

  // Función para el envío del formulario 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = form;
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, form]);
    }

    // Restablecer el formulario después de agregar o editar un registro
    setForm(initialFormState);
  };

  // Función para manejar la edición de un registro
  const handleEdit = (index) => {
    setSelectedRowIndex(index);
    setForm(data[index]);
    setEditIndex(index);
  };

  // Función para manejar la eliminación de un registro 
  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
    setEditIndex(null);
    setForm(initialFormState); // Restablecer el formulario cuando se borra un registro
  };

  // Función para manejar clics fuera del formulario y la tabla
  const handleClickOutside = (e) => {
    // Verificamos si el clic ocurrió fuera del formulario y la tabla
    if (
      formRef.current &&
      tableRef.current &&
      !formRef.current.contains(e.target) &&
      !tableRef.current.contains(e.target)
    ) {
      setEditIndex(null); // Salir del modo de edición
      setForm(initialFormState); // Restablecer el formulario
      setSelectedRowIndex(null); // Desmarca la fila seleccionada
    }
  };

  // Efecto para añadir y limpiar el listener de clics
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside); // Remover listener al desmontar
    };
  }, []);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Estado para el índice de la fila seleccionada

  return (
    <>
      <div className="line-wrapper">
        <h4>{editIndex !== null ? "Editar Usuario" : "Formulario de registro"}</h4>
      </div>
      <div className="content-wrapper">
        <div className="form-column" ref={formRef}>
          <RegistrationForm
            form={form}
            handleChange={handleChange} //Manejo de cambio de formulario
            handleSubmit={handleSubmit} // Envio de formulario
            editIndex={editIndex} //Editar usuario
            setEditIndex={setEditIndex} //Selección de usuario para editar
            handleDelete={handleDelete} //Eliminar registro de usuario
            availablePrograms={availablePrograms} // Pasar programas disponibles
            handleProgramChange={handleProgramChange} // Pasar manejador de programas
          />
        </div>

        <div className="table-column" ref={tableRef}>
          <Table>
            <thead>
              <tr>
                <th className="text-center">Nombres</th>
                <th className="text-center">Apellidos</th>
                <th className="text-center">Cédula</th>
                <th className="text-center">Correo</th>
                <th className="text-center">Rol</th>
                <th className="text-center">Programa</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elemento, index) => (
                <tr
                  key={index}
                  className={`table-row ${selectedRowIndex === index ? 'selected' : ''}`} // Aplica la clase 'selected' solo a la fila seleccionada
                  onClick={() => handleEdit(index)} // Al hacer clic, establece el índice de la fila seleccionada
                >
                  <td>{elemento.Nombres}</td>
                  <td>{elemento.Apellidos}</td>
                  <td>{elemento.Cedula}</td>
                  <td>{elemento.Correo}</td>
                  <td>{elemento.Rol}</td>
                  <td><ul>
          {elemento.Programas.map((programa, idx) => (
            <li key={idx}>{programa}</li>
          ))}
        </ul></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};