import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import '../index.css';

// Definición del componente CheckboxDropdown
const CheckboxDropdown = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((o) => o !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        Seleccionar
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.length > 0 ? (
              options.map((option, idx) => (
                <label key={idx} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No hay opciones disponibles</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

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
    // Opciones para actividades formativas si las hay
    'Acompañamiento académico a estudiantes': [
      // Añade las opciones necesarias
    ],
    'Cursos de fortalecimiento dirigido a estudiantes': [
      // Añade las opciones necesarias
    ],
    'Asesoría en emprendimiento': [
      // Añade las opciones necesarias
    ],
  };

  const [academicas, setAcademicas] = useState(() => {
    const savedAcademicas = localStorage.getItem('laboresAcademicas');
    return savedAcademicas
      ? JSON.parse(savedAcademicas)
      : [
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
  });

  const [formativas, setFormativas] = useState(() => {
    const savedFormativas = localStorage.getItem('laboresFormativas');
    return savedFormativas
      ? JSON.parse(savedFormativas)
      : [
          {
            actividad: 'Acompañamiento académico a estudiantes',
            horasSemanales: 0,
            horasSemestrales: 0,
            descripcionActividad: '',
            producto: [],
          },
          {
            actividad: 'Cursos de fortalecimiento dirigido a estudiantes',
            horasSemanales: 0,
            horasSemestrales: 0,
            descripcionActividad: '',
            producto: [],
          },
          {
            actividad: 'Asesoría en emprendimiento',
            horasSemanales: 0,
            horasSemestrales: 0,
            descripcionActividad: '',
            producto: [],
          },
        ];
  });

  // Guardar en LocalStorage cada vez que las actividades cambien
  useEffect(() => {
    localStorage.setItem('laboresAcademicas', JSON.stringify(academicas));
  }, [academicas]);

  useEffect(() => {
    localStorage.setItem('laboresFormativas', JSON.stringify(formativas));
  }, [formativas]);

  // Total de horas semanales de docencia registradas
  const totalHorasDocencia = props.totalHorasDocencia;

  const vaciarActividades = () => {
    // Reiniciar actividades académicas y formativas
    setAcademicas(
      academicas.map((a) => ({
        ...a,
        horasSemanales: 0,
        horasSemestrales: 0,
      }))
    );
    setFormativas(
      formativas.map((f) => ({
        ...f,
        horasSemanales: 0,
        horasSemestrales: 0,
      }))
    );
  };

  useImperativeHandle(ref, () => ({
    vaciarActividades,
  }));

  const handleAcademicasChange = (index, field, value) => {
    const nuevasAcademicas = [...academicas];

    if (field === 'horasSemanales') {
      // Restricciones: Validar horas según el tipo de actividad
      const horasDocencia = totalHorasDocencia; // Horas de docencia registradas
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

  const handleFormativasChange = (index, field, value) => {
    const nuevasFormativas = [...formativas];

    if (field === 'horasSemanales') {
      const horasDocencia = totalHorasDocencia;
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

  return (
    <div className="overflow-x-auto">
      <h5 className="text-xl font-bold mb-2">Labores Académicas y Formativas</h5>

      {/* Labores Académicas */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="header-row">
            <th colSpan="5" className="text-center p-2">
              Labores Académicas
            </th>
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
              <td className="border border-gray-300 p-2" style={{ width: '170px' }}>
                {item.actividad}
              </td>
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
            <th colSpan="5" className="text-center p-2">
              Labores Formativas
            </th>
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
        </tbody>
        <tbody>
          <tr className="bg-gray-200 font-bold">
            <td className="border border-gray-300 p-2">Total</td>
            <td className="border border-gray-300 p-2 text-center">{totalHorasDocencia}</td>
            <td className="border border-gray-300 p-2 text-center"></td>
            <td className="border border-gray-300 p-2" colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
