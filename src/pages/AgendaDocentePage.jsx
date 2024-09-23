import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../index.css';
import {LaboresAcademicas} from '../components/LaboresAcademicas';
import {LaboresCientificas} from '../components/LaboresCientificas';
import {LaboresExtension} from '../components/LaboresExtension';
import {GestionAcademica} from '../components/GestionAcademica';
import {LaboresDocencia} from '../components/LaboresDocencia';

export const AgendaDocentePage = () => {
  // Estado para manejar la pestaña activa
  const [value, setValue] = useState('1');

  // Manejar el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container mt-4">
        <h4>Agenda Docente</h4>
        {/* Contenedor para las pestañas */}
        <div className="overflow-auto">
          <TabContext value={value}>
            <Box 
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                /* Asegura que las pestañas no se envuelvan */
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'nowrap',
                },
              }}
              className="custom-tabs" /* Asignar la clase personalizada */
            >
              <TabList 
                onChange={handleChange} 
                aria-label="agenda docente tabs"
              >
                {/* Definición de cada Tab con estilos personalizados */}
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
      </div>
    </>
  );
};
