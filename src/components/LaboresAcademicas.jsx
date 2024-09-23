import React from 'react';

export const LaboresAcademicas = () => {
  return (
    <div>
      <h5>Labores Académicas y Formativas</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">Labores Académicas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Materia 1</td>
            <td>Descripción de la labor académica 1</td>
          </tr>
          <tr>
            <td>Materia 2</td>
            <td>Descripción de la labor académica 2</td>
          </tr>
          <tr>
            <td>Materia 3</td>
            <td>Descripción de la labor académica 3</td>
          </tr>
          {/* Puedes agregar más filas según sea necesario */}
        </tbody>
        <thead>
          <tr>
            <th colSpan="2" className="text-center">Labores Formativas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Taller 1</td>
            <td>Descripción de la labor formativa 1</td>
          </tr>
          <tr>
            <td>Taller 2</td>
            <td>Descripción de la labor formativa 2</td>
          </tr>
          <tr>
            <td>Taller 3</td>
            <td>Descripción de la labor formativa 3</td>
          </tr>
          {/* Puedes agregar más filas según sea necesario */}
        </tbody>
      </table>
    </div>
  );
};
