import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Box, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../index.css';
import { LaboresAcademicas } from '../components/LaboresAcademicas';
import { LaboresCientificas } from '../components/LaboresCientificas';
import { LaboresExtension } from '../components/LaboresExtension';
import { GestionAcademica } from '../components/GestionAcademica';
import { LaboresDocencia } from '../components/LaboresDocencia';

export const AgendaDocentePage = () => {
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

  // Funciones de manejo de botones
  const handleVaciar = () => {
    console.log("Vaciar acción");
    // Implementar lógica para vaciar el contenido
  };

  const handleExportar = () => {
    console.log("Exportar acción");
    // Implementar lógica para exportar el contenido
  };

  const handleEnviarReporte = () => {
    console.log("Enviar reporte acción");
    // Implementar lógica para enviar el reporte
  };

  return (
    <>
      <div className="container mt-4">
        {/* Título con sticky */}
        <h4>Agenda Docente</h4>
        {/* Contenedor para las pestañas */}
        <div className="table-column" ref={tableRef}>
          <TabContext value={value}>
            <Box 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'nowrap',
                },
              }}
              className="custom-tabs" 
            >
              <TabList onChange={handleChange} aria-label="agenda docente tabs">
                <Tab label="Labores de Docencia" value="1"/>
                <Tab label="Labores Académicas y Formativas" value="2" />
                <Tab label="Labores Científicas" value="3" />
                <Tab label="Labores de Extensión y Culturales" value="4" />
                <Tab label="Gestión Académica y Administrativa" value="5" />
              </TabList>
            </Box>
            {/* Contenido de cada TabPanel */}
            <TabPanel value="1">
              <div className="mt-3">
                <LaboresDocencia />
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="mt-3">
                <LaboresAcademicas />
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="mt-3">
                <LaboresCientificas />
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div className="mt-3">
               <LaboresExtension />
              </div>
            </TabPanel>
            <TabPanel value="5">
              <div className="mt-3">
                <GestionAcademica />
              </div>
            </TabPanel>
          </TabContext>
        </div>
        {/* Espacio para los botones */}
        <div className="button-container mt-4">
          <Button className="B-general" variant="outlined" onClick={handleVaciar} style={{ marginRight: '10px' }}>
            Vaciar
          </Button>
          <Button className="B-general" variant="outlined" onClick={handleExportar} style={{ marginRight: '10px' }}>
            Exportar
          </Button>
          <Button className="B-general" variant="outlined" onClick={handleEnviarReporte}>
            Enviar Reporte
          </Button>
        </div>
      </div>
    </>
  );
};
