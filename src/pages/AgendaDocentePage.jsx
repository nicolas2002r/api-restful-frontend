import React, { useState, useRef } from "react";
import { Box, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Swal from 'sweetalert2';
import '../index.css';
import { LaboresAcademicas } from '../components/LaboresAcademicas';
import { LaboresCientificas } from '../components/LaboresCientificas';
import { LaboresExtension } from '../components/LaboresExtension';
import { GestionAcademica } from '../components/GestionAcademica';
import { LaboresDocencia } from '../components/LaboresDocencia';

export const AgendaDocentePage = () => {
  const [value, setValue] = useState('1');

  // Refs para cada uno de los componentes para que su estado no se pierda
  const laboresAcademicasRef = useRef(null);
  const laboresCientificasRef = useRef(null);
  const laboresExtensionRef = useRef(null);
  const gestionAcademicaRef = useRef(null);
  const laboresDocenciaRef = useRef(null);

  // Estado para mantener los datos de cada pestaña
  const actividadesRefs = useRef({
    laboresAcademicas: null,
    laboresCientificas: null,
    laboresExtension: null,
    gestionAcademica: null,
    laboresDocencia: null
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVaciar = () => {
    // Llamamos a las funciones vaciarActividades de cada componente si existen
    if (laboresAcademicasRef.current) {
      laboresAcademicasRef.current.vaciarActividades();
    }
    if (laboresCientificasRef.current) {
      laboresCientificasRef.current.vaciarActividades();
    }
    if (laboresExtensionRef.current) {
      laboresExtensionRef.current.vaciarActividades();
    }
    if (gestionAcademicaRef.current) {
      gestionAcademicaRef.current.vaciarActividades();
    }
    if (laboresDocenciaRef.current) {
      laboresDocenciaRef.current.vaciarActividades();
    }
  };

  const handleEnviarReporte = () => {
    // Verificamos si hay actividades en LaboresDocencia
    if (laboresDocenciaRef.current && laboresDocenciaRef.current.getEntriesCount() === 0) {
      Swal.fire({
        title: "Error",
        text: "No puedes enviar el reporte sin al menos una materia registrada en Labores de Docencia.",
        icon: "error",
      });
    } else {
      console.log("Enviar reporte acción");
      Swal.fire({
        title: "¡Envío exitoso!",
        text: "El reporte se ha enviado exitosamente.",
        icon: "success",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3>AGENDA DOCENTE</h3>
      <div className="table-column">
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
          
          {/* TabPanels ajustados */}
          <TabPanel value="1">
            <div className="mt-3">
              <LaboresDocencia ref={laboresDocenciaRef}/>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="mt-3">
              <LaboresAcademicas ref={laboresAcademicasRef}/>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="mt-3">
              <LaboresCientificas ref={laboresCientificasRef}/>
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="mt-3">
              <LaboresExtension ref={laboresExtensionRef}/>
            </div>
          </TabPanel>
          <TabPanel value="5">
            <div className="mt-3">
              <GestionAcademica ref={gestionAcademicaRef}/>
            </div>
          </TabPanel>
        </TabContext>
      </div>
      
      <div className="button-container mt-4">
        <Button className="B-general" variant="outlined" onClick={handleVaciar} style={{ marginRight: '10px' }}>
          Vaciar
        </Button>
        <Button className="B-general" variant="outlined" onClick={handleEnviarReporte}>
          Enviar Reporte
        </Button>
      </div>
    </div>
  );
};
