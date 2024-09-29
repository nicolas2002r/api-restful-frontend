import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaDownload, FaCheck, FaTimes } from 'react-icons/fa';

export const MisAgendasPage = ({ files = [] }) => {
    // Mantener el estado de los archivos
    const [exampleFiles, setExampleFiles] = useState([
        ...files,
        {
            id: 1,
            url: 'http://example.com/file1.pdf',
            code: '12345',
            professorName: 'Jesús Ariel Gonzales',
            program: ['Ingeniería de Sistemas', 'Ingeniería Mecatronica'],
            date: '2024-09-27',
            period: '2024-2',
            size: '2MB',
            creationDate: '2024-09-20',
            status: 'Aprobado',
            statusDecano: ''
        },
        {
            id: 2,
            url: 'http://example.com/file2.pdf',
            code: '67890',
            professorName: 'Jesús Ariel Gonzales',
            program: ['Ingeniería de Sistemas', 'Ingeniería Mecatronica'],
            date: '2024-09-27',
            period: '2024-2',
            size: '3MB',
            creationDate: '2024-09-21',
            status: '',
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

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Aprobado':
                return { color: 'green' };
            case 'Rechazado':
                return { color: 'red' };
            default:
                return { color: 'orange' };
        }
    };

    const getStatusText = (status) => {
        return status ? status : 'Pendiente';
    };
    const getStatusDecanoStyle = (statusDecano) => {
        switch (statusDecano) {
            case 'Aprobado':
                return { color: 'green' };
            case 'Rechazado':
                return { color: 'red' };
            default:
                return { color: 'orange' };
        }
    };
    const getStatusDecanoText = (statusDecano) => {
        return statusDecano ? statusDecano : 'Pendiente';
    };

    return (
        <div className="container mt-4">
            <h3>AGENDA DOCENTE</h3>
            <div className="table-column">
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
                                <td style={getStatusStyle(file.status)}>
                                    {getStatusText(file.status)}
                                </td>
                                <td style={getStatusDecanoStyle(file.statusDecano)}>
                                    {getStatusDecanoText(file.statusDecano)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
