import React, { useState, useRef } from "react";
import '../index.css';
import { AgendasDirectorPrograma } from '../components/AgendasDirectorPrograma';

export const RevisionDirectorProgramapage = () => {
  // Estado para manejar la pestaña activa
  const [value, setValue] = useState('1');
  // Referencia para el contenedor de la tabla
  const tableRef = useRef(null);

  // Manejar el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Desplazar la vista hacia la parte superior de la tabla
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

   return (
    <>
      <div className="container mt-4">
        {/* Título con sticky */}
        <h4>Revisión de Agendas</h4>
        <div>
        <AgendasDirectorPrograma />
      </div>
      </div>
    </>
  );
};