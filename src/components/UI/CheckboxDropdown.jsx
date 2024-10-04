import React, { useState, useRef, useEffect } from 'react';

// Componente CheckboxDropdown que recibe tres props:
// options: una lista de opciones para mostrar en el dropdown.
// selectedOptions: opciones seleccionadas actualmente.
// onChange: función que se llama cuando cambia la selección.
export const CheckboxDropdown = ({ options, selectedOptions, onChange }) => {
  
  // Estado para controlar si el dropdown está abierto o cerrado.
  const [isOpen, setIsOpen] = useState(false);
  
  // Referencia para el elemento del dropdown, utilizada para manejar clics fuera del componente.
  const dropdownRef = useRef(null);

  // Función que alterna el estado del dropdown (abierto/cerrado).
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Maneja el cambio de selección en las opciones del dropdown.
  // Si la opción ya está seleccionada, se elimina, de lo contrario se agrega.
  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      // Eliminar la opción de la lista si ya está seleccionada.
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      // Agregar la opción a la lista de seleccionados.
      onChange([...selectedOptions, option]);
    }
  };

  // Detecta clics fuera del dropdown para cerrarlo automáticamente.
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);  // Cerrar el dropdown si se hace clic fuera.
    }
  };

  // useEffect para agregar y limpiar el event listener que detecta clics fuera del componente.
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);  // Agregar el event listener.
    return () => document.removeEventListener('mousedown', handleClickOutside);  // Limpiar el event listener al desmontar el componente.
  }, []);

  return (
    // Contenedor del dropdown, con referencia para manejar clics fuera.
    <div className="relative" ref={dropdownRef}>
      {/* Botón que muestra el texto del dropdown. Cambia dependiendo de si hay opciones seleccionadas o no. */}
      <button
        type="button"
        onClick={toggleDropdown}  // Llama a la función que abre/cierra el dropdown.
        className="w-full px-2 py-1 border rounded bg-white text-left focus:outline-none"
      >
        {/* Muestra las opciones seleccionadas o el texto por defecto. */}
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Seleccionar producto'}
      </button>

      {/* Si el dropdown está abierto, se muestran las opciones en una lista. */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
          {/* Mapear sobre las opciones y crear un checkbox para cada una. */}
          {options.map((option, index) => (
            <label key={index} className="flex items-center px-2 py-1 hover:bg-gray-100">
              {/* Checkbox para seleccionar/deseleccionar la opción. */}
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}  // Controla si está marcado o no.
                onChange={() => handleOptionChange(option)}  // Llama a la función de cambio de selección.
                className="mr-2"
              />
              {option}  {/* Muestra el nombre de la opción. */}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
