import React from 'react';

export const LaboresDocencia = () => {
  const rows = 5;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ORIENTACIÓN DE CLASES - DOCENCIA</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="border border-gray-300 p-2">Nombre de la asignatura</th>
            <th className="border border-gray-300 p-2">Programa</th>
            <th className="border border-gray-300 p-2">Grupo</th>
            <th className="border border-gray-300 p-2">Sede</th>
            <th className="border border-gray-300 p-2">Dedicación (Horas semanales)</th>
            <th className="border border-gray-300 p-2">Dedicación (Horas semestre)</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                
              </td>
              <td className="border border-gray-300 p-2">
                
              </td>
              <td className="border border-gray-300 p-2">
                
              </td>
              <td className="border border-gray-300 p-2">
                
              </td>
              <td className="border border-gray-300 p-2">
               
              </td>
              <td className="border border-gray-300 p-2">
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-4">
        
      </div>
    </div>
  );
};

export default LaboresDocencia;