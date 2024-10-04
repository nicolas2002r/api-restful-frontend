import React, { useState, useEffect, useRef } from "react";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';

// Componente principal para la página de registro de usuarios
export const UserRegistrationPage = () => {
  // Estado para almacenar los datos de los usuarios registrados
  const [data, setData] = useState([]);

  // Estado inicial para el formulario de registro
  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente de Planta",
    Programas: [],
    TipoInvestigador: "",
  };

  // Estado para el formulario, índice de edición y fila seleccionada
  const [form, setForm] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Estado para la fila seleccionada

  // Referencias para el formulario y la tabla
  const formRef = useRef(null);
  const tableRef = useRef(null);
  // Ejemplo de lista de programas disponibles
  const availablePrograms = [
    "Ingeniería de Sistemas",
    "Ingeniería Electrónica",
    "Ingeniería Ambiental",
    "Ingeniería de Renovables"
  ];

  // Función para obtener datos desde la API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios');
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const result = await response.json();
      setData(result); // Suponiendo que la respuesta es un array de objetos
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    fetchData(); // Llama a la función para obtener los datos
  }, []);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Maneja los cambios en la selección de programas
  const handleProgramChange = (selectedPrograms) => {
    setForm((prevForm) => ({
      ...prevForm,
      Programas: selectedPrograms,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Actualiza la entrada existente si se está editando
      const updatedData = [...data];
      updatedData[editIndex] = form;
      setData(updatedData);
      setEditIndex(null);
    } else {
      // Agrega una nueva entrada si no se está editando
      setData([...data, form]);
    }

    // Restablece el formulario al estado inicial
    setForm(initialFormState);
  };

  // Maneja la edición de un usuario seleccionado
  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
    setSelectedRowIndex(index); // Establece la fila seleccionada al editar
  };

  // Maneja el clic fuera del formulario y la tabla para cancelar la edición
  const handleClickOutside = (e) => {
    if (
      formRef.current &&
      tableRef.current &&
      !formRef.current.contains(e.target) &&
      !tableRef.current.contains(e.target)
    ) {
      setEditIndex(null);
      setForm(initialFormState);
      setSelectedRowIndex(null); // Resetea el índice seleccionado
    }
  };

  // Agrega y limpia el evento de clic fuera al montar y desmontar el componente
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Renderiza el componente
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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cédula</th>
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
                  <td>{item.Programas.join(", ")}</td>
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
