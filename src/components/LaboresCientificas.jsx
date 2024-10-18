import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';
import '../index.css';

export const LaboresCientificas = forwardRef((props, ref) => {
  const productoOptionsMap = {
    'Gestión de semilleros de investigación': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'MATERIAL EDUCATIVO UTILIZADO',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
    ],
    'Elaboración de propuestas para convocatorias de CTeI': [
      'PROPUESTA PARA CONVOCATORIA INTERNA',
    ],
    'Gestión de proyectos de investigación en CTeI': [
      'PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES',
      'PROYECTOS FINALIZADOS: INFORME FINAL TÉCNICO Y FINANCIERO',
      'CONSULTORÍA REALIZADA: INFORME FINAL',
      'REGISTRO DE SOFTWARE REALIZADO',
      'REGISTRO DE PATENTE: AVANCE EN PROCESO O CONVALIDADA',
      'PRODUCTO TECNOLÓGICO: CERTIFICADO O VALIDADO',
      'CONCEPTOS TÉCNICOS O INFORMES TÉCNICOS: CONVALIDADOS',
    ],
    'Dirección de grupos de investigación': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'MATERIAL EDUCATIVO UTILIZADO',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
    ],
    'Elaboración de artículos científicos y textos académicos': [
      'ARTÍCULO(S) DE INVESTIGACIÓN SOMETIDO(S)',
      'ARTÍCULO(S) PUBLICADO(S)',
      'LIBRO RESULTADO DE INVESTIGACIÓN PUBLICADO',
      'PROPUESTA DE LIBRO RESULTADO DE INVESTIGACIÓN ELABORADA',
      'CAPÍTULOS DE LIBRO RESULTADO DE INVESTIGACIÓN PUBLICADO',
    ],
  };

  const generateInitialActividades = () => {
    return [
      {
        actividad: 'Gestión de semilleros de investigación',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Gestión de semilleros de investigación']],
      },
      {
        actividad: 'Elaboración de propuestas para convocatorias de CTeI',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Elaboración de propuestas para convocatorias de CTeI']],
      },
      {
        actividad: 'Gestión de proyectos de investigación en CTeI',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Gestión de proyectos de investigación en CTeI']],
      },
      {
        actividad: 'Dirección de grupos de investigación',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Dirección de grupos de investigación']],
      },
      {
        actividad: 'Elaboración de artículos científicos y textos académicos',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Elaboración de artículos científicos y textos académicos']],
      },
    ];
  };

  // Cargar actividades guardadas en localStorage o generar iniciales
  const loadCientificasFromStorage = () => {
    const savedData = localStorage.getItem('cientificas');
    return savedData ? JSON.parse(savedData) : generateInitialActividades();
  };

  const [cientificas, setCientificas] = useState(loadCientificasFromStorage());

  useEffect(() => {
    // Guardar actividades en localStorage cuando cientificas cambie
    localStorage.setItem('cientificas', JSON.stringify(cientificas));
  }, [cientificas]);

  const vaciarActividades = () => {
    setCientificas(generateInitialActividades());
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleCientificasChange = (index, field, value) => {
    const nuevasCientificas = [...cientificas];
    
    if (field === 'horasSemanales') {
      // Validar horas según las restricciones
      const actividad = nuevasCientificas[index].actividad;

      // Restricciones específicas para cada actividad científica
      if (actividad === 'Gestión de semilleros de investigación' && Number(value) > 3) {
        Swal.fire({
          title: 'Error',
          text: 'La gestión de semilleros de investigación no puede superar 3 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Elaboración de propuestas para convocatorias de CTeI' && Number(value) > 2) {
        Swal.fire({
          title: 'Error',
          text: 'La elaboración de propuestas para convocatorias no puede superar 2 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Dirección de grupos de investigación' && Number(value) > 3) {
        Swal.fire({
          title: 'Error',
          text: 'La dirección de grupos de investigación no puede superar 3 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Elaboración de artículos científicos y textos académicos' && Number(value) > 2) {
        Swal.fire({
          title: 'Error',
          text: 'La elaboración de artículos científicos no puede superar 2 horas semanales.',
          icon: 'error',
        });
        return;
      }

      nuevasCientificas[index].horasSemanales = Number(value);
      nuevasCientificas[index].horasSemestrales = Number(value) * 16;
    } else {
      nuevasCientificas[index][field] = value;
    }

    setCientificas(nuevasCientificas);
  };

  const totalHorasSemanalesCientificas = cientificas.reduce((acc, curr) => acc + curr.horasSemanales, 0);
  const totalHorasSemestralesCientificas = cientificas.reduce((acc, curr) => acc + curr.horasSemestrales, 0);

  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Labores Científicas</h5>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">Labores Científicas</th>
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
          {cientificas.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2" style={{ width: '170px' }}>{item.actividad}</td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemanales}
                  onChange={(e) => handleCientificasChange(index, 'horasSemanales', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemestrales}
                  onChange={(e) => handleCientificasChange(index, 'horasSemestrales', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <textarea
                  value={item.descripcionActividad}
                  onChange={(e) => handleCientificasChange(index, 'descripcionActividad', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[item.actividad] || []}
                  selectedOptions={item.producto}
                  onChange={(selected) => handleCientificasChange(index, 'producto', selected)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr className="bg-gray-200 font-bold">
            <td className="border border-gray-300 p-2">Total</td>
            <td className="border border-gray-300 p-2 text-center">
              {cientificas.reduce((acc, curr) => acc + Number(curr.horasSemanales), 0)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {cientificas.reduce((acc, curr) => acc + Number(curr.horasSemestrales), 0)}
            </td>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
