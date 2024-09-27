import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';
import '../index.css';

export const GestionAcademica = forwardRef((props, ref) => {
  //Información del producto
  const productoOptionsMap = {
    'Participación como jurado y/o asesor académico en trabajos de grado': [
      'OFICIO DE RETROALIMENTACIÓN DE OPCIONES DE GRADO PARA PREGRADO Y POSGRADO - F0-GD-51 (POR TRABAJO DE GRADO ASIGNADO)',
    ],
    'Participación en procesos de registros calificados': [
      'DOCUMENTOS ASIGNADOS PARA EL REGISTRO CALIFICADO',
    ],
    'Participación en procesos de acreditación': [
      'DOCUMENTOS ASIGNADOS PARA LA ACREDITACIÓN DEL PROGRAMA ACADÉMICO',
    ],
    'Participación en Consejos y Comités': [
      'REPORTE DE LA ASISTENCIA A CONSEJOS Y COMITES SEGÚN CORRESPONDA',
    ],
    'Participación en procesos de autoevaluación': [
      'DOCUMENTOS ASIGNADOS EN EL PROCESO DE AUTOEVALUACIÓN',
    ],
    'Participación en Investigaciones de mercado': [
      'DOCUMENTO ESTUDIO DE MERCADO',
    ],
    'Participación en procesos de formación de profesores': [
      'REPORTE DE LA ASISTENCIA A LOS PROCESOS DE FORMACIÓN EN LOS QUE HA SIDO CONVOCADO',
    ],
    'Programación y gestión de prácticas extramuros': [
      'FORMATO PLANEACIÓN DE PRÁCTICA EXTRAMURO - FO-GD-25',
      'INFORME DE LA PRACTICA EXTRAMURO - FO-GD-24',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
    ],
    'Elaboración de exámenes para validaciones': [
      'ACTA DE VALIDACIÓN - FO-GD-46',
    ],
    'Líder de CTeI, extensión y proyección social': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
      'RECOPILACIÓN DE LOS PRODUCTOS DE PROYECTOS DE CTEI, EXTENSIÓN Y PROYECCIÓN SOCIAL DEL PROGRAMA ACADÉMICO',
    ],
    'Líder de resultados de aprendizaje': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
      'MATRIZ DE RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP',
      'INFORME DE LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP',
      'INSTRUMENTOS PARA LA EVALUACIÓN DE LOS RESULTADOS DE APRENDIZAJE DEL PROGRAMA - RAP',
    ],
  };

  // Inicializar actividades de extensión con productos seleccionados

const generateInitialActividades = () => {
  return [
    {
      actividad: 'Participación como jurado y/o asesor académico en trabajos de grado',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación como jurado y/o asesor académico en trabajos de grado'],
    },
    {
      actividad: 'Participación en procesos de registros calificados',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en procesos de registros calificados'],
    },
    {
      actividad: 'Participación en procesos de acreditación',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en procesos de acreditación'],
    },
    {
      actividad: 'Participación en Consejos y Comités',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en Consejos y Comités'],
    },
    {
      actividad: 'Participación en procesos de autoevaluación',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en procesos de autoevaluación'],
    },
    {
      actividad: 'Participación en Investigaciones de mercado',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en Investigaciones de mercado'],
    },
    {
      actividad: 'Participación en procesos de formación de profesores',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Participación en procesos de formación de profesores'],
    },
    {
      actividad: 'Programación y gestión de prácticas extramuros',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Programación y gestión de prácticas extramuros'],
    },
    {
      actividad: 'Elaboración de exámenes para validaciones',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Elaboración de exámenes para validaciones'],
    },
    {
      actividad: 'Líder de CTeI, extensión y proyección social',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Líder de CTeI, extensión y proyección social'],
    },
    {
      actividad: 'Líder de resultados de aprendizaje',
      horasSemanales: 0,
      horasSemestrales: 0,
      descripcionActividad: '',
      producto: productoOptionsMap['Líder de resultados de aprendizaje'],
    },
  ];
};
const [gestion, setGAcademica] = useState(generateInitialActividades());

const vaciarActividades = () => {
  setGAcademica(generateInitialActividades());
};

useImperativeHandle(ref, () => ({
  vaciarActividades,
}));
//Funcion para gestionar las actualizaciones de los datos
  const handleGAcademicaChange = (index, field, value) => {
    const nuevasExtension = [...gestion];
    nuevasGAcademica[index][field] = field.includes('horas') ? Number(value) : value;
    setGAcademica(nuevasGAcademica);
  };
//Formula para mostrar el total de horas
  const totalHorasSemanales = gestion.reduce((acc, curr) => acc + curr.horasSemanales, 0);
  const totalHorasSemestrales = gestion.reduce((acc, curr) => acc + curr.horasSemestrales, 0);

  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Gestion Academica</h5>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">Gestion Academica</th>
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
          {gestion.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2" style={{ width: '170px' }}>{item.actividad}</td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemanales}
                  onChange={(e) =>
                    handleGAcademicaChange(index, 'horasSemanales', e.target.value)
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
                    handleGAcademicaChange(index, 'horasSemestrales', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={item.descripcionActividad}
                  onChange={(e) =>
                    handleGAcademicaChange(index, 'descripcionActividad', e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={item.producto}
                  selectedOptions={item.producto}
                  onChange={(selected) => handleGAcademicaChange(index, 'producto', selected)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <td className="border border-gray-300 p-2 text-right font-bold" colSpan="1">Total:</td>
            <td className="border border-gray-300 p-2 text-center font-bold">{totalHorasSemanales}</td>
            <td className="border border-gray-300 p-2 text-center font-bold">{totalHorasSemestrales}</td>
            <td colSpan="2" className="border border-gray-300 p-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});
