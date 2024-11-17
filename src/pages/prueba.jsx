import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown';

export const Prueba = (props, ref) => {
    const [tareaOptionsMapAcademicas, setTareaOptionsMapAcademicas] = useState({});
    const [tareaOptionsMapFormativas, setTareaOptionsMapFormativas] = useState({});
    const [selectedTareas, setSelectedTareas] = useState({});
    const [horasSemanalesAcademicas, setHorasSemanalesAcademicas] = useState([]);
    const [horasSemanalesFormativas, setHorasSemanalesFormativas] = useState([]);
    const actividadAcademicaIds = [1]; // IDs de actividades académicas
    const actividadFormativaIds = [2]; // IDs de actividades formativas
    const MAX_HORAS_SEMANAL = 24; // Límite de horas semanales
    const SEMESTRE_SEMANAS = 16; // Asumiendo 16 semanas por semestre

    const fetchTareaOptions = async (id) => {
        try {
            const response = await axios.get(`https://api-restful-backend.onrender.com/api/actividades/${id}/subactividades-tareas`);
            return response.data; 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al obtener los datos de las labores de docencia.',
            });
        }
    };

    useEffect(() => {
        const fetchAllTareas = async () => {
            // Obtener tareas para actividades académicas
            const tareasAcademicasPromises = actividadAcademicaIds.map(id => fetchTareaOptions(id));
            const resultsAcademicas = await Promise.all(tareasAcademicasPromises);
            const newTareaOptionsMapAcademicas = {};
            resultsAcademicas.forEach((subactividades) => {
                subactividades.forEach(subactividad => {
                    newTareaOptionsMapAcademicas[subactividad.nombre] = subactividad.tareas.map(t => t.nombre);
                });
            });
            setTareaOptionsMapAcademicas(newTareaOptionsMapAcademicas);

            // Obtener tareas para actividades formativas
            const tareasFormativasPromises = actividadFormativaIds.map(id => fetchTareaOptions(id));
            const resultsFormativas = await Promise.all(tareasFormativasPromises);
            const newTareaOptionsMapFormativas = {};
            resultsFormativas.forEach((subactividades) => {
                subactividades.forEach(subactividad => {
                    newTareaOptionsMapFormativas[subactividad.nombre] = subactividad.tareas.map(t => t.nombre);
                });
            });
            setTareaOptionsMapFormativas(newTareaOptionsMapFormativas);

            // Seleccionar automáticamente todas las tareas
            const selectedTareasAcademicas = Object.keys(newTareaOptionsMapAcademicas).reduce((acc, subactividad) => {
                acc[subactividad] = newTareaOptionsMapAcademicas[subactividad]; // Seleccionar todas las tareas
                return acc;
            }, {});

            const selectedTareasFormativas = Object.keys(newTareaOptionsMapFormativas).reduce((acc, subactividad) => {
                acc[subactividad] = newTareaOptionsMapFormativas[subactividad]; // Seleccionar todas las tareas
                return acc;
            }, {});

            setSelectedTareas({ ...selectedTareasAcademicas, ...selectedTareasFormativas });
            setInitialSelectedTareas({ ...selectedTareasAcademicas, ...selectedTareasFormativas }); // Guardar estado inicial
        };

        fetchAllTareas();
    }, []);

    const handleTareaChange = (subactividad, selectedOptions) => {
        setSelectedTareas({ ...selectedTareas, [subactividad]: selectedOptions });
    };

    const handleAcademicasChange = (index, value) => {
        const nuevasAcademicas = [...horasSemanalesAcademicas];
    
        // Asegurarse de que el valor sea un número
        const numericValue = Number(value);
    
        if (!isNaN(numericValue)) {
            // Validaciones de horas para labores académicas
            const horasDocencia = props.totalHorasDocencia; // Horas de docencia registradas
            const maxHoras = (horasDocencia * 0.2).toFixed(2); // 20% de horas para preparación o evaluación
    
            if (numericValue < 0) {
                Swal.fire({
                    title: 'Error',
                    text: 'Las horas no pueden ser negativas.',
                    icon: 'error',
                });
                return;
            }
    
            if (index === 0 || index === 1) { // Preparación de clases o Evaluación de aprendizaje
                if (numericValue > maxHoras) {
                    Swal.fire({
                        title: 'Error',
                        text: `Las horas semanales no pueden exceder el 20% de las horas de docencia (${maxHoras} horas).`,
                        icon: 'error',
                    });
                    return;
                }
            }
    
            if (index === 2 && numericValue > 1) { // Gestión de eventos académicos
                Swal.fire({
                    title: 'Error',
                    text: 'La gestión de eventos académicos tiene un límite de 1 hora semanal.',
                    icon: 'error',
                });
                return;
            }
    
            nuevasAcademicas[index] = numericValue;
            setHorasSemanalesAcademicas(nuevasAcademicas);
        }
    };
    

    const handleFormativasChange = (index, value) => {
        const nuevasFormativas = [...horasSemanalesFormativas];

        // Validaciones de horas para labores formativas
        const horasDocencia = props.totalHorasDocencia; // Horas de docencia registradas
        const maxHorasAcomp = (horasDocencia * 0.1).toFixed(2); // 10% de horas para acompañamiento académico

        if (value) {
            if (index === 0 && Number(value) > maxHorasAcomp) { // Acompañamiento académico a estudiantes
                Swal.fire({
                    title: 'Error',
                    text: `Las horas para acompañamiento académico no pueden exceder el 10% de las horas de docencia (${maxHorasAcomp} horas).`,
                    icon: 'error',
                });
                return;
            }

            if (index === 1 && Number(value) > 2) { // Asesoría en emprendimiento
                Swal.fire({
                    title: 'Error',
                    text: 'La asesoría en emprendimiento tiene un límite de 2 horas por emprendimiento.',
                    icon: 'error',
                });
                return;
            }

            nuevasFormativas[index] = Number(value);
            setHorasSemanalesFormativas(nuevasFormativas);
        } else {
            // Permitir que se quite el valor
            nuevasFormativas[index] = 0; 
            setHorasSemanalesFormativas(nuevasFormativas);
        }
    };

    const handleVaciarTareas = () => {
        setSelectedTareas(initialSelectedTareas); // Restablecer a las tareas seleccionadas inicialmente
        setHorasSemanalesAcademicas([]); // Vaciar horas semanales académicas
        setHorasSemanalesFormativas([]); // Vaciar horas semanales formativas
    };
    

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
                    {Object.entries(tareaOptionsMapAcademicas).map(([subactividad, tareas], index) => (
                        <tr key={subactividad}>
                            <td>{subactividad}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={horasSemanalesAcademicas[index] || ''}
                                    onChange={(e) => handleAcademicasChange(index, e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={(horasSemanalesAcademicas[index] || 0) * SEMESTRE_SEMANAS} // Cálculo de horas semestrales
                                    readOnly
                                    className="w-full p-1 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">
                                <textarea
                                    className="w-full p-1 border border-gray-300 rounded"
                                    rows="4"
                                ></textarea>
                            </td>
                            <td>
                                <CheckboxDropdown
                                    options={tareas}
                                    selectedOptions={selectedTareas[subactividad] || []}
                                    onChange={(selectedOptions) => handleTareaChange(subactividad, selectedOptions)}
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
                        <th className="border border-gray-200 p-1 header-cell">Dedicación (Horas Semanales)</th>
                        <th className="border border-gray-200 p-1 header-cell">Dedicación (Horas Semestrales)</th>
                        <th className="border border-gray-300 p-4 header-cell">Descripción de la Actividad</th>
                        <th className="border border-gray-300 p-2 header-cell">Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(tareaOptionsMapFormativas).map(([subactividad, tareas], index) => (
                        <tr key={subactividad}>
                            <td>{subactividad}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={horasSemanalesFormativas[index] || ''}
                                    onChange={(e) => handleFormativasChange(index, e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={(horasSemanalesFormativas[index] || 0) * SEMESTRE_SEMANAS} // Cálculo de horas semestrales
                                    readOnly
                                    className="w-full p-1 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="border border-gray-300 p-2">
                                <textarea
                                    className="w-full p-1 border border-gray-300 rounded"
                                    rows="4"
                                ></textarea>
                            </td>
                            <td>
                                <CheckboxDropdown
                                    options={tareas}
                                    selectedOptions={selectedTareas[subactividad] || []}
                                    onChange={(selectedOptions) => handleTareaChange(subactividad, selectedOptions)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleVaciarTareas}
            >
                Vaciar
            </button>
        </div>
    );
};
