import React, { useState, useEffect, useRef } from "react";
import { Table } from 'reactstrap';
import RegistrationForm from "../components/RegistrationForm";
import '../index.css';

export const UserRegistrationPage = () => {
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
      Programas: ["Ing. Renovables", "Ing. Sistemas"],
      TipoInvestigador: "Investigador Senior",
    },
    {
      Nombres: "Maria",
      Apellidos: "Lopez",
      Cedula: "98765432",
      Correo: "maria.lopez@corhuila.edu.co",
      Rol: "Director",
      Programas: ["Ing. Renovables"],
    },
    {
      Nombres: "Carlos",
      Apellidos: "Perez",
      Cedula: "56789012",
      Correo: "carlos.perez@corhuila.edu.co",
      Rol: "Decano",
      Programas: ["Ing. Sistemas"],
    },
    {
      Nombres: "Ana",
      Apellidos: "Martinez",
      Cedula: "34567890",
      Correo: "ana.martinez@corhuila.edu.co",
      Rol: "Docente de Medio Tiempo",
      Programas: ["Ing. Ambiental"],
      TipoInvestigador: "Investigador Asociado",
    },
  ]);

  const initialFormState = {
    Nombres: "",
    Apellidos: "",
    Cedula: "",
    Correo: "",
    Rol: "Docente de Planta",
    Programas: [],
    TipoInvestigador: "", // Nuevo campo añadido
  };

  const [form, setForm] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Estado para la fila seleccionada

  const formRef = useRef(null);
  const tableRef = useRef(null);

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
      Programas: selectedPrograms,
    }));
  };

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

    setForm(initialFormState);
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
    setSelectedRowIndex(index); // Establece la fila seleccionada al editar
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
      setSelectedRowIndex(null); // Resetea el índice seleccionado
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

