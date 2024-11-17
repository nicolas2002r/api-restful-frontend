import React, { useState, useRef, useEffect } from "react";
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

  // Estado para almacenar las horas totales de docencia
  const [totalHorasSemanalesDocencia, setTotalHorasSemanalesDocencia] = useState(0);
  const [totalHorasSemestralesDocencia, setTotalHorasSemestralesDocencia] = useState(0);

  // Estado para almacenar las horas totales de Labores Académicas
  const [totalHorasSemanalesAcademicas, setTotalHorasSemanalesAcademicas] = useState(0);
  const [totalHorasSemestralesAcademicas, setTotalHorasSemestralesAcademicas] = useState(0);
  
  // Estado para almacenar las horas totales de Labores Científicas
  const [totalHorasSemanalesCientificas, setTotalHorasSemanalesCientificas] = useState(0);
  const [totalHorasSemestralesCientificas, setTotalHorasSemestralesCientificas] = useState(0);
  
  // Estado para almacenar las horas totales de Labores de Extensión
  const [totalHorasSemanalesExtension, setTotalHorasSemanalesExtension] = useState(0);
  const [totalHorasSemestralesExtension, setTotalHorasSemestralesExtension] = useState(0);
  
  // Estado para almacenar las horas totales de Gestión Académica
  const [totalHorasSemanalesGAcademicas, setTotalHorasSemanalesGAcademicas] = useState(0);
  const [totalHorasSemestralesGAcademicas, setTotalHorasSemestralesGAcademicas] = useState(0);

  // Calculo de horas restantes
  const totalHorasSemanalesRestantes = totalHorasSemanalesDocencia - (totalHorasSemanalesAcademicas + totalHorasSemanalesCientificas + totalHorasSemanalesExtension + totalHorasSemanalesGAcademicas);
  const totalHorasSemestralesRestantes = totalHorasSemestralesDocencia - (totalHorasSemestralesAcademicas + totalHorasSemestralesCientificas + totalHorasSemestralesExtension + totalHorasSemestralesGAcademicas);

  // Refs para los componentes
  const laboresAcademicasRef = useRef(null);
  const laboresCientificasRef = useRef(null);
  const laboresExtensionRef = useRef(null);
  const gestionAcademicaRef = useRef(null);
  const laboresDocenciaRef = useRef(null);

  // Cambia la pestaña activa
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Función para actualizar las horas totales desde LaboresDocencia
  const actualizarTotalesDocencia = () => {
    if (laboresDocenciaRef.current) {
      const entries = laboresDocenciaRef.current.getEntries();
      const totalSemanales = entries.reduce((acc, entry) => acc + parseFloat(entry.horasSemanales || 0), 0);
      const totalSemestrales = entries.reduce((acc, entry) => acc + parseFloat(entry.horasSemestre || 0), 0);

      setTotalHorasSemanalesDocencia(totalSemanales);
      setTotalHorasSemestralesDocencia(totalSemestrales);
    }
  };

  // Funciones para manejar el cambio de horas en cada categoría
  const handleHorasSemanalesChange = (horasSemanales, horasSemestrales) => {
    setTotalHorasSemanalesAcademicas(horasSemanales);
    setTotalHorasSemestralesAcademicas(horasSemestrales);
  };
  
  const handleHorasSemanalesCientificasChange = (horasSemanales, horasSemestrales) => {
    setTotalHorasSemanalesCientificas(horasSemanales);
    setTotalHorasSemestralesCientificas(horasSemestrales);
  };
  
  const handleHorasSemanalesExtensionChange = (horasSemanales, horasSemestrales) => {
    setTotalHorasSemanalesExtension(horasSemanales);
    setTotalHorasSemestralesExtension(horasSemestrales);
  };
  
  const handleHorasSemanalesGAcademicasChange = (horasSemanales, horasSemestrales) => {
    setTotalHorasSemanalesGAcademicas(horasSemanales);
    setTotalHorasSemestralesGAcademicas(horasSemestrales);
  };

  // Función para vaciar los datos de todos los componentes
  const handleVaciar = () => {
    laboresDocenciaRef.current?.vaciarActividades();
    laboresAcademicasRef.current?.vaciarActividades();
    laboresCientificasRef.current?.vaciarActividades();
    laboresExtensionRef.current?.vaciarActividades();
    gestionAcademicaRef.current?.vaciarActividades();
  };

  // Función para enviar el reporte
  const handleEnviarReporte = () => {
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

  useEffect(() => {
    actualizarTotalesDocencia();
  }, [value]);
  
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
              <Tab label="Labores de Docencia" value="1" />
              <Tab label="Labores Académicas y Formativas" value="2" />
              <Tab label="Labores Científicas" value="3" />
              <Tab label="Labores de Extensión y Culturales" value="4" />
              <Tab label="Gestión Académica y Administrativa" value="5" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <div className="mt-3">
              <LaboresDocencia ref={laboresDocenciaRef} actualizarTotales={actualizarTotalesDocencia} />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="mt-3">
              <LaboresAcademicas
                ref={laboresAcademicasRef}
                totalHorasSemanalesDocencia={totalHorasSemanalesDocencia}
                totalHorasSemestralesDocencia={totalHorasSemestralesDocencia}
                onHorasSemanalesChange={handleHorasSemanalesChange}
              />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="mt-3">
              <LaboresCientificas
                ref={laboresCientificasRef}
                totalHorasSemanalesDocencia={totalHorasSemanalesDocencia}
                totalHorasSemestralesDocencia={totalHorasSemestralesDocencia}
                onHorasSemanalesCientificasChange={handleHorasSemanalesCientificasChange}
              />
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="mt-3">
              <LaboresExtension
                ref={laboresExtensionRef}
                totalHorasSemanalesDocencia={totalHorasSemanalesDocencia}
                totalHorasSemestralesDocencia={totalHorasSemestralesDocencia}
                onHorasSemanalesExtensionChange={handleHorasSemanalesExtensionChange}
              />
            </div>
          </TabPanel>
          <TabPanel value="5">
            <div className="mt-3">
              <GestionAcademica
                ref={gestionAcademicaRef}
                totalHorasSemanalesDocencia={totalHorasSemanalesDocencia}
                totalHorasSemestralesDocencia={totalHorasSemestralesDocencia}
                onHorasSemanalesGAcademicasChange={handleHorasSemanalesGAcademicasChange}
              />
            </div>
          </TabPanel>
        </TabContext>
      </div>
      <div className="button-container mt-2">
        <div className="horas-container mt-2">
          <p>Horas Semanales: {totalHorasSemanalesRestantes} Horas Semestrales: {totalHorasSemestralesRestantes}</p>
        </div>
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
