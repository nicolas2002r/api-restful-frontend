import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';
import '../index.css';

export const LaboresAcademicas = forwardRef((props, ref) => {
  const productoOptionsMap = {
    'Preparación de clases': [
      'SYLLABUS DE LA ASIGNATURA',
      'MATERIAL EDUCATIVO SUBIDO EN LA PLATAFORMA MOODLE, EN EL CURSO DE CADA ASIGNATURA O MÓDULO',
      'MATERIALES EDUCATIVOS UTILIZADOS EN CADA ENCUENTRO SINCRÓNICO REALIZADO',
      'RECURSOS (VIDEOS, LINKS, INFOGRAFÍAS, DIAPOSITIVAS, DOCUMENTOS BIBLIOGRÁFICOS U OTROS RECURSOS EDUCATIVOS)',
      'ACTIVIDADES (CUESTIONARIOS, EJERCICIOS, TALLERES, TAREAS, FOROS U OTRAS)',
    ],
    'Evaluación de aprendizaje a estudiantes': [
      'PLANILLA DE CALIFICACIONES (CORHUILAPLUS+)',
      'EVIDENCIAS DE AUTOEVALUACIÓN',
      'EVIDENCIAS DE COEVALUACIÓN',
      'NOTA: CUESTIONARIOS, GUÍAS PARA EJERCICIOS, TALLERES',
    ],
    'Gestión de eventos académicos': [
      'FO-GD-83 PLANEACIÓN ACTIVIDADES ACADÉMICAS',
      'FO-GD-84 AGENDA PARA ACTIVIDADES ACADÉMICAS',
      'FO-GD-85 PRESUPUESTO PARA ACTIVIDADES ACADÉMICAS',
      'LISTADO DE ASISTENCIA',
    ],
    'Acompañamiento académico a estudiantes': [
      'TRES REPORTES SOBRE EL DESARROLLO DEL ACOMPAÑAMIENTO',
      'SOPORTE DE LAS REMISIONES DE ESTUDIANTES',
    ],
    'Cursos de fortalecimiento dirigido a estudiantes': [
      'INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD',
      'LISTADO DE ASISTENCIA',
      'RECURSOS EDUCATIVOS',
    ],
    'Asesoría en emprendimiento': [
      'INFORME EJECUTIVO DEL DESARROLLO DE LA ACTIVIDAD',
      'MATERIAL DE APOYO',
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
    setAcademicas([
      {
        actividad: 'Preparación de clases',
        horasSemanales: '',
        horasSemestrales: '',
        descripcionActividad: '',
        producto: [...productoOptionsMap['Preparación de clases']],
      },
      {
        actividad: 'Evaluación de aprendizaje a estudiantes',
        horasSemanales: '',
        horasSemestrales: '',
        descripcionActividad: '',
        producto: [...productoOptionsMap['Evaluación de aprendizaje a estudiantes']],
      },
      {
        actividad: 'Gestión de eventos académicos',
        horasSemanales: '',
        horasSemestrales: '',
        descripcionActividad: '',
        producto: [...productoOptionsMap['Gestión de eventos académicos']],
      },
    ]);

    setFormativas([
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
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleAcademicasChange = (index, field, value) => {
    const nuevasAcademicas = [...academicas];
    nuevasAcademicas[index][field] =
      field.includes('horas') ? Number(value) : value;
    setAcademicas(nuevasAcademicas);
  };

  const handleFormativasChange = (index, field, value) => {
    const nuevasFormativas = [...formativas];
    nuevasFormativas[index][field] =
      field.includes('horas') ? Number(value) : value;
    setFormativas(nuevasFormativas);
  };

   // Calcular totales para académicas y formativas
   const totalHorasSemanalesAcademicas = academicas.reduce((acc, curr) => acc + curr.horasSemanales, 0);
   const totalHorasSemestralesAcademicas = academicas.reduce((acc, curr) => acc + curr.horasSemestrales, 0);
 
   const totalHorasSemanalesFormativas = formativas.reduce((acc, curr) => acc + curr.horasSemanales, 0);
   const totalHorasSemestralesFormativas = formativas.reduce((acc, curr) => acc + curr.horasSemestrales, 0);
 
   // Sumar totales
   const totalHorasSemanales = totalHorasSemanalesAcademicas + totalHorasSemanalesFormativas;
   const totalHorasSemestrales = totalHorasSemestralesAcademicas + totalHorasSemestralesFormativas;
 
  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Labores Académicas y Formativas</h5>
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
                  onChange={(e) =>
                    handleAcademicasChange(index, 'horasSemanales', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemestrales}
                  onChange={(e) =>
                    handleAcademicasChange(index, 'horasSemestrales', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={item.descripcionActividad}
                  onChange={(e) =>
                    handleAcademicasChange(index, 'descripcionActividad', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[item.actividad] || []}
                  selectedOptions={item.producto}
                  onChange={(selected) =>
                    handleAcademicasChange(index, 'producto', selected)
                  }

                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                  onChange={(e) =>
                    handleFormativasChange(index, 'horasSemanales', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemestrales}
                  onChange={(e) =>
                    handleFormativasChange(index, 'horasSemestrales', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={item.descripcionActividad}
                  onChange={(e) =>
                    handleFormativasChange(index, 'descripcionActividad', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[item.actividad] || []}
                  selectedOptions={item.producto}
                  onChange={(selected) =>
                    handleFormativasChange(index, 'producto', selected)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr className="bg-gray-200 font-bold">
            <td className="border border-gray-300 p-2">Total</td>
            <td className="border border-gray-300 p-2 text-center">
              {totalHorasSemanales}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {totalHorasSemestrales}
            </td>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});