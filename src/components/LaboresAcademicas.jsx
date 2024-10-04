import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../index.css';
import { CheckboxDropdown } from "../components/UI/CheckboxDropdown";

export const LaboresAcademicas = forwardRef((props, ref) => {
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

  const [academicas, setAcademicas] = useState([
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
  ]);

  const [formativas, setFormativas] = useState([
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
  ]);


  const vaciarActividades = () => {
    // Reiniciar actividades académicas y formativas
    const resetAcademicas = academicas.map(a => ({ ...a, horasSemanales: 0, horasSemestrales: 0, descripcionActividad: '', producto: [] }));
    const resetFormativas = formativas.map(f => ({ ...f, horasSemanales: 0, horasSemestrales: 0, descripcionActividad: '', producto: [] }));

    setAcademicas(resetAcademicas);
    setFormativas(resetFormativas);

    // Actualizar localStorage después de vaciar
    localStorage.setItem('laboresAcademicasData', JSON.stringify(resetAcademicas));
    localStorage.setItem('laboresFormativasData', JSON.stringify(resetFormativas));

    Swal.fire({
      title: 'Éxito',
      text: 'Las actividades han sido vaciadas correctamente.',
      icon: 'success',
    });
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleAcademicasChange = (index, field, value) => {
    const nuevasAcademicas = [...academicas];
//Validaciones de horas
    if (field === 'horasSemanales') {
      const horasDocencia = props.totalHorasDocencia; // Horas de docencia registradas
      const maxHoras = (horasDocencia * 0.2).toFixed(2); // 20% de horas para preparación o evaluación

      if (nuevasAcademicas[index].actividad === 'Preparación de clases' || nuevasAcademicas[index].actividad === 'Evaluación de aprendizaje a estudiantes') {
        if (Number(value) > maxHoras) {
          Swal.fire({
            title: 'Error',
            text: `Las horas semanales no pueden exceder el 20% de las horas de docencia (${maxHoras} horas).`,
            icon: 'error',
          });
          return;
        }
      }

      if (nuevasAcademicas[index].actividad === 'Gestión de eventos académicos' && Number(value) > 1) {
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

  const handleFormativasChange = (index, field, value) => {

    const nuevasFormativas = [...formativas];

    if (field === 'horasSemanales') {
      const horasDocencia = props.totalHorasDocencia;
      const maxHorasAcomp = (horasDocencia * 0.1).toFixed(2); // 10% para acompañamiento

      if (nuevasFormativas[index].actividad === 'Acompañamiento académico a estudiantes' && Number(value) > maxHorasAcomp) {
        Swal.fire({
          title: 'Error',
          text: `Las horas para acompañamiento académico no pueden exceder el 10% de las horas de docencia (${maxHorasAcomp} horas).`,
          icon: 'error',
        });
        return;
      }

      if (nuevasFormativas[index].actividad === 'Asesoría en emprendimiento' && Number(value) > 2) {
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
    const fetchEntries = async () => {
      try {
        // Cambia la URL a tu API local
        const response = await fetch('http://localhost:8080/actividad-controller/listarActividades');
        
        if (!response.ok) {
          throw new Error('Error al obtener las entradas');
        }
        
        const data = await response.json();
        setEntries(data); // Asegúrate de que 'data' tenga el formato adecuado para las entradas
  
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los datos de las labores de docencia.',
        });
      }
    };
  
    fetchEntries(); // Ejecuta la función para obtener los datos
  }, []);
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
          <th className="border border-gray-200 p-1 header-cell">Dedicación (Horas Semanales)</th>
          <th className="border border-gray-200 p-1 header-cell">Dedicación (Horas Semestrales)</th>
          <th className="border border-gray-300 p-4 header-cell">Descripción de la Actividad</th>
          <th className="border border-gray-300 p-2 header-cell">Producto</th>
        </tr>
      </thead>
      <tbody>
        {academicas.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2" style={{ width: '170px' }}>{item.actividad}</td>
            <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
              <input
                type="number"
                min="0"
                value={item.horasSemanales}
                onChange={(e) => handleAcademicasChange(index, 'horasSemanales', e.target.value)}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
              <input
                type="number"
                min="0"
                value={item.horasSemestrales}
                readOnly
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <textarea
                value={item.descripcionActividad}
                onChange={(e) => handleAcademicasChange(index, 'descripcionActividad', e.target.value)}
                className="w-full p-1 border border-gray-300 rounded"
                rows="4"
              ></textarea>
            </td>
            <td className="border border-gray-300 p-2">
            <CheckboxDropdown
                options={productoOptionsMap[item.actividad] || []}
                selectedOptions={item.producto}
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
        <tr className="bg-green-200">
          <th className="border border-gray-300 p-4 header-cell">Actividad</th>
          <th className="border border-gray-300 p-1 header-cell">Dedicación (Horas Semanales)</th>
          <th className="border border-gray-300 p-1 header-cell">Dedicación (Horas Semestrales)</th>
          <th className="border border-gray-300 p-4 header-cell">Descripción de la Actividad</th>
          <th className="border border-gray-300 p-2 header-cell">Producto</th>
        </tr>
      </thead>
      <tbody>
        {formativas.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{item.actividad}</td>
            <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
              <input
                type="number"
                min="0"
                value={item.horasSemanales}
                onChange={(e) => handleFormativasChange(index, 'horasSemanales', e.target.value)}
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
              <input
                type="number"
                min="0"
                value={item.horasSemestrales}
                readOnly
                className="w-full p-1 border border-gray-300 rounded"
              />
            </td>
            <td className="border border-gray-300 p-2">
              <textarea
                value={item.descripcionActividad}
                onChange={(e) => handleFormativasChange(index, 'descripcionActividad', e.target.value)}
                className="w-full p-1 border border-gray-300 rounded"
                rows="4"
              ></textarea>
            </td>
            <td className="border border-gray-300 p-2">
              <CheckboxDropdown
                options={productoOptionsMap[item.actividad] || []}
                selectedOptions={item.producto}
                onChange={(selected) => handleFormativasChange(index, 'producto', selected)}
              />
            </td>
          </tr>
        ))}
        {/* Fila de Totales para Labores Formativas */}
        <tr className="bg-gray-300 font-bold">
          <td className="border border-gray-300 p-2 text-right" colSpan="1">Total:</td>
          <td className="border border-gray-300 p-2 text-center">{totalHorasSemanales()}</td>
          <td className="border border-gray-300 p-2 text-center">{totalHorasSemestrales()}</td>
          <td className="border border-gray-300 p-2" colSpan="2"></td>
        </tr>
      </tbody>
    </table>
  </div>
);
});
