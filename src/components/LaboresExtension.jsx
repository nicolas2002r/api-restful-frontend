import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Swal from 'sweetalert2'; // Importamos SweetAlert para alertas
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';
import '../index.css';

export const LaboresExtension = forwardRef((props, ref) => {
  const productoOptionsMap = {
    'Gestión de proyectos de consultoría': [
      'PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES',
      'PROYECTOS FINALIZADOS: INFORME FINAL',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
    ],
    'Acompañamiento al sector empresarial': [
      'INFORME DE GESTIÓN DEL ACOMPAÑAMIENTO REALIZADO AL SECTOR EMPRESARIAL DURANTE EL PERIODO ACADÉMICO',
      'ACTAS DE REUNIÓN',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
    ],
    'Participación en proyectos de intervención comunitaria': [
      'PROYECTOS EN EJECUCIÓN: INFORMES PARCIALES',
      'PROYECTOS FINALIZADOS: INFORME FINAL',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
    ],
    'Gestión de proyectos culturales': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
    ],
    'Promoción de la educación artística': [
      'INFORME DE GESTIÓN REALIZADA DURANTE EL PERIODO ACADÉMICO',
      'AGENDAS Y/O ACTAS',
      'LISTADOS DE ASISTENCIA',
      'REGISTRO FOTOGRÁFICO Y/O VIDEO',
      'MATERIAL EDUCATIVO UTILIZADO',
    ],
    'Divulgación de los valores culturales': [],
  };

  const generateInitialActividades = () => {
    return [
      {
        actividad: 'Gestión de proyectos de consultoría',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Gestión de proyectos de consultoría']],
      },
      {
        actividad: 'Acompañamiento al sector empresarial',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Acompañamiento al sector empresarial']],
      },
      {
        actividad: 'Participación en proyectos de intervención comunitaria',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Participación en proyectos de intervención comunitaria']],
      },
      {
        actividad: 'Gestión de proyectos culturales',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Gestión de proyectos culturales']],
      },
      {
        actividad: 'Promoción de la educación artística',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Promoción de la educación artística']],
      },
      {
        actividad: 'Divulgación de los valores culturales',
        horasSemanales: 0,
        horasSemestrales: 0,
        descripcionActividad: '',
        producto: [...productoOptionsMap['Divulgación de los valores culturales']],
      },
    ];
  };

  const [extension, setExtension] = useState(generateInitialActividades());

  const vaciarActividades = () => {
    setExtension(generateInitialActividades());
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleExtensionChange = (index, field, value) => {
    const nuevasExtension = [...extension];
    
    if (field === 'horasSemanales') {
      // Validar las restricciones de horas semanales para cada actividad
      const actividad = nuevasExtension[index].actividad;

      if (actividad === 'Gestión de proyectos de consultoría' && Number(value) > 5) {
        Swal.fire({
          title: 'Error',
          text: 'La gestión de proyectos de consultoría no puede superar 5 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Acompañamiento al sector empresarial' && Number(value) > 4) {
        Swal.fire({
          title: 'Error',
          text: 'El acompañamiento al sector empresarial no puede superar 4 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Participación en proyectos de intervención comunitaria' && Number(value) > 4) {
        Swal.fire({
          title: 'Error',
          text: 'La participación en proyectos de intervención comunitaria no puede superar 4 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Gestión de proyectos culturales' && Number(value) > 3) {
        Swal.fire({
          title: 'Error',
          text: 'La gestión de proyectos culturales no puede superar 3 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Promoción de la educación artística' && Number(value) > 2) {
        Swal.fire({
          title: 'Error',
          text: 'La promoción de la educación artística no puede superar 2 horas semanales.',
          icon: 'error',
        });
        return;
      }
      if (actividad === 'Divulgación de los valores culturales' && Number(value) > 2) {
        Swal.fire({
          title: 'Error',
          text: 'La divulgación de los valores culturales no puede superar 2 horas semanales.',
          icon: 'error',
        });
        return;
      }

      nuevasExtension[index].horasSemanales = Number(value);
      nuevasExtension[index].horasSemestrales = Number(value) * 16;
    } else {
      nuevasExtension[index][field] = value;
    }

    setExtension(nuevasExtension);
  };

  const totalHorasSemanales = extension.reduce((acc, curr) => acc + curr.horasSemanales, 0);
  const totalHorasSemestrales = extension.reduce((acc, curr) => acc + curr.horasSemestrales, 0);

  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Labores de Extensión</h5>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">Labores de Extensión</th>
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
          {extension.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2" style={{ width: '170px' }}>{item.actividad}</td>
              <td className="border border-gray-300 p-2 text-center" style={{ width: '10px' }}>
                <input
                  type="number"
                  min="0"
                  value={item.horasSemanales}
                  onChange={(e) => handleExtensionChange(index, 'horasSemanales', e.target.value)}
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
                  onChange={(e) => handleExtensionChange(index, 'descripcionActividad', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
              </td>
              <td className="border border-gray-300 p-2">
                <CheckboxDropdown
                  options={productoOptionsMap[item.actividad] || []}
                  selectedOptions={item.producto}
                  onChange={(selected) => handleExtensionChange(index, 'producto', selected)}
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
