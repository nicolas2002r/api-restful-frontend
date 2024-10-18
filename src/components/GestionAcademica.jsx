import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';
import Swal from 'sweetalert2'; // Importamos SweetAlert para mostrar alertas
import '../index.css';

export const GestionAcademica = forwardRef((props, ref) => {
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

  // Función para cargar desde localStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('gestionAcademica');
    return savedData ? JSON.parse(savedData) : generateInitialActividades();
  };

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

  const [gestion, setGAcademica] = useState(loadFromLocalStorage());

  // Guardar en localStorage cada vez que el estado cambie
  useEffect(() => {
    localStorage.setItem('gestionAcademica', JSON.stringify(gestion));
  }, [gestion]);

  const vaciarActividades = () => {
    setGAcademica(generateInitialActividades());
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleGAcademicaChange = (index, field, value) => {
    const nuevasGAcademica = [...gestion];
    
    if (field === 'horasSemanales') {
      // Validar las restricciones de horas para cada actividad
      const actividad = nuevasGAcademica[index].actividad;

      // Restricciones específicas de actividades de gestión académica
      if (actividad === 'Participación como jurado y/o asesor académico en trabajos de grado' && Number(value) > 2) {
        Swal.fire({
          title: 'Error',
          text: 'No puedes asignar más de 2 horas semanales a trabajos de grado.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Participación en procesos de registros calificados' && Number(value) > 1) {
        Swal.fire({
          title: 'Error',
          text: 'No puedes asignar más de 1 hora semanal para registros calificados.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Participación en procesos de acreditación' && Number(value) > 1) {
        Swal.fire({
          title: 'Error',
          text: 'No puedes asignar más de 1 hora semanal para acreditación.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Participación en Consejos y Comités' && Number(value) > 1) {
        Swal.fire({
          title: 'Error',
          text: 'No puedes asignar más de 1 hora semanal para Consejos y Comités.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Programación y gestión de prácticas extramuros' && Number(value) > 4) {
        Swal.fire({
          title: 'Error',
          text: 'No puedes asignar más de 4 horas semanales para prácticas extramuros.',
          icon: 'error',
        });
        return;
      }
    }

    nuevasGAcademica[index][field] = value;
    setGAcademica(nuevasGAcademica);
  };

  return (
    <div>
      <h3 className='titleStyle'>Gestión Académica</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Horas Semanales</th>
            <th>Horas Semestrales</th>
            <th>Descripción de la Actividad</th>
            <th>Producto</th>
          </tr>
        </thead>
        <tbody>
          {gestion.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.actividad}</td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  value={actividad.horasSemanales}
                  onChange={(e) => handleGAcademicaChange(index, 'horasSemanales', e.target.value)}
                />
              </td>
              <td>
                <input
                  type='number'
                  className='form-control'
                  value={actividad.horasSemestrales}
                  onChange={(e) => handleGAcademicaChange(index, 'horasSemestrales', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  className='form-control'
                  value={actividad.descripcionActividad}
                  onChange={(e) => handleGAcademicaChange(index, 'descripcionActividad', e.target.value)}
                />
              </td>
              <td>
                <CheckboxDropdown
                  options={productoOptionsMap[actividad.actividad]}
                  selectedOptions={actividad.producto}
                  onOptionChange={(selectedOptions) =>
                    handleGAcademicaChange(index, 'producto', selectedOptions)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
