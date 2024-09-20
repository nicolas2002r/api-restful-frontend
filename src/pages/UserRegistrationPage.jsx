import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';
import { MainLayout } from "../layouts/MainLayout";

//Se define el componente
export const UserRegistrationPage = () => {
  const [data, setData] = useState([
    {
      Nombres: "Jesus",
      Apellidos: "Ariel Gonzaless",
      Cedula: "12312312",
      Correo: "jesus.gonzales@corhuila.edu.co",
      Rol: "Docente",
    },
  ]);

  // Estado inicial del formulario (campos vacíos)
  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente",
  };
  //Estado para controlar el formulario
  const [form, setForm] = useState(initialFormState);
  //Indice de la fila que se está editando
  const [editIndex, setEditIndex] = useState(null);

  //Referencia para el formulario y la tabla
  const formRef = useRef(null);
  const tableRef = useRef(null);

  //Función para manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para el envío del formulario 
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
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                handleDelete={handleDelete}
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
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
    </>
  );
};
