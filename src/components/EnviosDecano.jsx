import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap'; 
import { FaDownload, FaCheck, FaTimes } from 'react-icons/fa'; 

// Componente EnviosDecano que recibe un prop `files` que contiene una lista de archivos (por defecto es una lista vacía).
export const EnviosDecano = ({ files = [] }) => {
  // Estado local para manejar los archivos que se mostrarán en la tabla.
  const [exampleFiles, setExampleFiles] = useState([
    // Inicializa el estado con los archivos recibidos y agrega un archivo de ejemplo.
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

  // Función para manejar la descarga del archivo.
  const handleDownload = (fileUrl) => {
    window.location.href = fileUrl; // Redirecciona al archivo para iniciar la descarga.
  };

  // Función para manejar la aprobación de un archivo por su ID.
  const handleApprove = (fileId) => {
    // Actualiza el estado del archivo a 'Aprobado' si coincide el ID.
    setExampleFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, statusDecano: 'Aprobado' } : file
      )
    );
    console.log(`Archivo ${fileId} aprobado`); // Mensaje en consola para indicar la aprobación.
  };

  // Función para manejar el rechazo de un archivo por su ID.
  const handleReject = (fileId) => {
    // Actualiza el estado del archivo a 'Rechazado' si coincide el ID.
    setExampleFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, statusDecano: 'Rechazado' } : file
      )
    );
    console.log(`Archivo ${fileId} rechazado`); // Mensaje en consola para indicar el rechazo.
  };

  return (
    // Tabla de React-Bootstrap para mostrar los archivos.
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
          <th>Estado Aprobación</th> 
        </tr>
      </thead>
      <tbody>
        {exampleFiles.map((file, index) => (
          // Cada archivo se representa como una fila en la tabla.
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
            <td>{file.status}</td>
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
