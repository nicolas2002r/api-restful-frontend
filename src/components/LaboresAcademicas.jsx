import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../index.css';
import { CheckboxDropdown } from "../components/UI/CheckboxDropdown";

export const LaboresAcademicas = forwardRef((props, ref) => {
  const { onHorasSemanalesChange } = props;
  const productoOptionsMap = {
    'Preparación de clases': [
      'SYLLABUS DE LA ASIGNATURA',
      'MATERIAL EDUCATIVO SUBIDO EN LA PLATAFORMA MOODLE',
      'MATERIALES EDUCATIVOS UTILIZADOS EN CADA ENCUENTRO',
      'RECURSOS (VIDEOS, LINKS, INFOGRAFÍAS, DIAPOSITIVAS)',
      'ACTIVIDADES (CUESTIONARIOS, TAREAS, FOROS)',
    ],
    'Evaluación de aprendizaje a estudiantes': [
      'PLANILLA DE CALIFICACIONES',
      'EVIDENCIAS DE AUTOEVALUACIÓN',
      'NOTA: CUESTIONARIOS, GUÍAS',
    ],
    'Gestión de eventos académicos': [
      'FO-GD-83 PLANEACIÓN ACTIVIDADES ACADÉMICAS',
      'FO-GD-84 AGENDA PARA ACTIVIDADES',
      'FO-GD-85 PRESUPUESTO ACTIVIDADES ACADÉMICAS',
      'LISTADO DE ASISTENCIA',
    ],
    'Acompañamiento académico a estudiantes': [
      'TRES REPORTES SOBRE EL DESARROLLO',
      'SOPORTE DE LAS REMISIONES DE ESTUDIANTES',
    ],
    'Cursos de fortalecimiento dirigido a estudiantes': [
      'INFORME EJECUTIVO DEL DESARROLLO',
      'LISTADO DE ASISTENCIA',
      'RECURSOS EDUCATIVOS',
      'EVALUACIÓN DEL CURSO',
    ],
    'Asesoría en emprendimiento': [
      'INFORME EJECUTIVO DEL DESARROLLO',
      'MATERIAL DE APOYO',
      'EVALUACIÓN DE LA ASESORÍA',
    ],
  };

  // Estado inicial para labores académicas y formativas
  const [academicas, setAcademicas] = useState(() => {
    const savedAcademicas = localStorage.getItem('laboresAcademicas');
    return savedAcademicas ? JSON.parse(savedAcademicas) : generateInitialActividadesAcademicas();
  });
  
  const generateInitialActividadesAcademicas = () => [
    {
      actividad: 'Preparación de clases',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Preparación de clases']],
    },
    {
      actividad: 'Evaluación de aprendizaje a estudiantes',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Evaluación de aprendizaje a estudiantes']],
    },
    {
      actividad: 'Gestión de eventos académicos',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Gestión de eventos académicos']],
    },
  ];

  const [formativas, setFormativas] = useState(() => {
    const savedFormativas = localStorage.getItem('laboresFormativas');
    return savedFormativas ? JSON.parse(savedFormativas) : generateInitialActividadesFormativas();
  });
  
  const generateInitialActividadesFormativas = () => [
    {
      actividad: 'Acompañamiento académico a estudiantes',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Acompañamiento académico a estudiantes']],
    },
    {
      actividad: 'Cursos de fortalecimiento dirigido a estudiantes',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Cursos de fortalecimiento dirigido a estudiantes']],
    },
    {
      actividad: 'Asesoría en emprendimiento',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: [...productoOptionsMap['Asesoría en emprendimiento']],
    },
  ];

  // Efectos para guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem('laboresAcademicas', JSON.stringify(academicas));
  }, [academicas]);

  useEffect(() => {
    localStorage.setItem('laboresFormativas', JSON.stringify(formativas));
  }, [formativas]);

  // Función para vaciar ambas tablas
  const vaciarActividades = () => {
    setAcademicas(generateInitialActividadesAcademicas());
    setFormativas(generateInitialActividadesFormativas());
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  // Manejadores de cambios en las labores académicas
  const handleAcademicasChange = (index, field, value) => {
    const nuevasAcademicas = [...academicas];

    // Validación de horas para las actividades académicas
    if (field === 'horasSemanales') {
      const horasDocencia = props.horasSemanales;
      const maxHoras = (horasDocencia * 0.2).toFixed(2); // 20% de horas para preparación o evaluación

      if (
        nuevasAcademicas[index].actividad === 'Preparación de clases' ||
        nuevasAcademicas[index].actividad === 'Evaluación de aprendizaje a estudiantes'
      ) {
        if (Number(value) > maxHoras) {
          Swal.fire({
            title: 'Error',
            text: `Las horas semanales no pueden exceder el 20% de las horas de docencia (${maxHoras} horas).`,
            icon: 'error',
          });
          return;
        }
      }

      if (
        nuevasAcademicas[index].actividad === 'Gestión de eventos académicos' &&
        Number(value) > 1
      ) {
        Swal.fire({
          title: 'Error',
          text: 'La gestión de eventos académicos tiene un límite de 1 hora semanal.',
          icon: 'error',
        });
        return;
      }

      nuevasAcademicas[index].horasSemanales = Number(value);
      nuevasAcademicas[index].horasSemestrales = Number(value) * 16;
    } else {
      nuevasAcademicas[index][field] = value;
    }

    setAcademicas(nuevasAcademicas);
  };

  // Manejadores de cambios en las labores formativas
  const handleFormativasChange = (index, field, value) => {
    const nuevasFormativas = [...formativas];

    if (field === 'horasSemanales') {
      const horasDocencia = props.totalHorasDocencia;
      const maxHorasAcomp = (horasDocencia * 0.1).toFixed(2); // 10% para acompañamiento

      if (
        nuevasFormativas[index].actividad === 'Acompañamiento académico a estudiantes' &&
        Number(value) > maxHorasAcomp
      ) {
        Swal.fire({
          title: 'Error',
          text: `Las horas para acompañamiento académico no pueden exceder el 10% de las horas de docencia (${maxHorasAcomp} horas).`,
          icon: 'error',
        });
        return;
      }

      if (
        nuevasFormativas[index].actividad === 'Cursos de fortalecimiento dirigido a estudiantes' &&
        Number(value) > 1
      ) {
        Swal.fire({
          title: 'Error',
          text: `Las horas para Cursos de fortalecimiento dirigido a estudiantes tiene un límite de 1 hora semanal`,
          icon: 'error',
        });
        return;
      }

      if (
        nuevasFormativas[index].actividad === 'Asesoría en emprendimiento' &&
        Number(value) > 2
      ) {
        Swal.fire({
          title: 'Error',
          text: 'La asesoría en emprendimiento tiene un límite de 2 horas por emprendimiento.',
          icon: 'error',
        });
        return;
      }

      nuevasFormativas[index].horasSemanales = Number(value);
      nuevasFormativas[index].horasSemestrales = Number(value) * 16;
    } else {
      nuevasFormativas[index][field] = value;
    }

    setFormativas(nuevasFormativas);
  };

  // Cálculo de horas totales
  const totalHorasSemanales = () => {
    const totalAcademicas = academicas.reduce((sum, item) => sum + item.horasSemanales, 0);
    const totalFormativas = formativas.reduce((sum, item) => sum + item.horasSemanales, 0);
    return totalAcademicas + totalFormativas;
  };

  const totalHorasSemestrales = () => {
    const totalAcademicas = academicas.reduce((sum, item) => sum + item.horasSemestrales, 0);
    const totalFormativas = formativas.reduce((sum, item) => sum + item.horasSemestrales, 0);
    return totalAcademicas + totalFormativas;
  };
  
 useEffect(() => {
  // Cada vez que cambian las horas en Labores Académicas, avisa al padre
  onHorasSemanalesChange(totalHorasSemanales, totalHorasSemestrales);
}, [totalHorasSemanales, totalHorasSemestrales]);

  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Labores Académicas y Formativas</h5>
      {/* Labores Académicas */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">Labores Académicas</th>
          </tr>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 p-4 header-cell">Actividad</th>
            <th className="border border-gray-300 p-4 header-cell">Horas Semanales</th>
            <th className="border border-gray-300 p-4 header-cell">Horas Semestrales</th>
            <th className="border border-gray-300 p-4 header-cell">Descripción</th>
            <th className="border border-gray-300 p-4 header-cell">Producto</th>
          </tr>
        </thead>
        <tbody>
          {academicas.map((actividad, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{actividad.actividad}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={actividad.horasSemanales}
                  onChange={(e) => handleAcademicasChange(index, 'horasSemanales', e.target.value)}
                  className="input-field"
                  min = "0"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={actividad.horasSemestrales}
                  onChange={(e) => handleAcademicasChange(index, 'horasSemestrales', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                  disabled
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={actividad.descripcionActividad}
                  onChange={(e) => handleAcademicasChange(index, 'descripcionActividad', e.target.value)}
                  className="textarea-field"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[actividad.actividad]}
                  selectedOptions={actividad.producto}
                  onChange={(selected) => handleAcademicasChange(index, 'producto', selected)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Labores Formativas */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">Labores Formativas</th>
          </tr>
          <tr className="bg-blue-200">
            <th className="border border-gray-300 p-4 header-cell">Actividad</th>
            <th className="border border-gray-300 p-4 header-cell">Horas Semanales</th>
            <th className="border border-gray-300 p-4 header-cell">Horas Semestrales</th>
            <th className="border border-gray-300 p-4 header-cell">Descripción</th>
            <th className="border border-gray-300 p-4 header-cell">Producto</th>
          </tr>
        </thead>
        <tbody>
          {formativas.map((actividad, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{actividad.actividad}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={actividad.horasSemanales}
                  onChange={(e) => handleFormativasChange(index, 'horasSemanales', e.target.value)}
                  className="input-field"
                  min = "0"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={actividad.horasSemestrales}
                  onChange={(e) => handleFormativasChange(index, 'horasSemestrales', e.target.value)}
                  className="input-field"
                  disabled
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={actividad.descripcionActividad}
                  onChange={(e) => handleFormativasChange(index, 'descripcionActividad', e.target.value)}
                  className="textarea-field"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[actividad.actividad]}
                  selectedOptions={actividad.producto}
                  onChange={(selected) => handleFormativasChange(index, 'producto', selected)}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-bold">
            <td className="border border-gray-300 p-2">Total</td>
            <td className="border border-gray-300 p-2 text-center">
              {totalHorasSemanales()}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {totalHorasSemestrales()}
            </td>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
