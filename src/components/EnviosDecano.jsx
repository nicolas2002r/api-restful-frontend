import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaDownload, FaCheck, FaTimes } from 'react-icons/fa';

export const EnviosDecano = ({ files = [] }) => {
  // Mantener el estado de los archivos
  const [exampleFiles, setExampleFiles] = useState([
    ...files,
    {
      id: 1,
      url: 'http://example.com/file1.pdf',
      code: '12345',
      professorName: 'Juan Pérez',
      program: 'Ingeniería de Sistemas',
      date: '2024-09-27',
      period: '2024-2',
      size: '2MB',
      creationDate: '2024-09-20',
      status: 'Aprobado',
      statusDecano: ''
    }
  ]);

  const handleDownload = (fileUrl) => {
    // Lógica para descargar el archivo
    window.location.href = fileUrl;
  };
  
  const handleApprove = (fileId) => {
    // Actualiza el estado del archivo a 'Aprobado'
    setExampleFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, statusDecano: 'Aprobado' } : file
      )
    );
    console.log(`Archivo ${fileId} aprobado`);
  };
  
  const handleReject = (fileId) => {
    // Actualiza el estado del archivo a 'Rechazado'
    setExampleFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, statusDecano: 'Rechazado' } : file
      )
    );
    console.log(`Archivo ${fileId} rechazado`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Descargar</th>
          <th>Código</th>
          <th>Nombre del Profesor</th>
          <th>Programa</th>
          <th>Fecha</th>
          <th>Periodo</th>
          <th>Estado</th>
          <th>Estado Aprobación</th> {/* Nueva columna para el estado de aprobación */}
        </tr>
      </thead>
      <tbody>
        {exampleFiles.map((file, index) => (
          <tr key={index}>
            <td>
              <Button onClick={() => handleDownload(file.url)}>
                <FaDownload />
              </Button>
            </td>
            <td>{file.code}</td>
            <td>{file.professorName}</td>
            <td>{file.program}</td>
            <td>{file.date}</td>
            <td>{file.period}</td>
            <td>{file.status}</td> {/* Estado actual */}
            <td>
              {file.statusDecano === 'Aprobado' || file.statusDecano === 'Rechazado' ? (
                <span style={{ color: file.statusDecano === 'Aprobado' ? 'green' : 'red' }}>
                  {file.statusDecano}
                </span>
              ) : (
                <>
                  <Button variant="success" onClick={() => handleApprove(file.id)}>
                    <FaCheck />
                  </Button>
                  <Button variant="danger" onClick={() => handleReject(file.id)}>
                    <FaTimes />
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
