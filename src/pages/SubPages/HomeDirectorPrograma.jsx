import React from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import '../../index.css'; // Asegúrate de que la ruta del CSS sea correcta

export const HomeDirectorPrograma = () => {
    return (
        <div className="container mt-4 home-docente-content">
            <h3>Bienvenido Director de programa al Sistema de Gestión de Agenda Docente</h3>
            <div className="content-wrapper">
                {/* Primera sección */}
                <div className="container overflow-container">
                    <section className="text-content">

                        <div className="d-sm-flex align-items-center justify-content-between">
                            <div className="col-md p-3">
                                <p>
                                    La <strong>Agenda Docente</strong> es una herramienta diseñada para facilitar la gestión y aprobación de las agendas enviadas por los docentes. 
                                    Como <strong>Director de Programa</strong>, puedes revisar las agendas enviadas, aprobar o rechazar las solicitudes de los docentes, y descargar informes detallados de las actividades programadas.
                                </p>
                                <p>
                                    A través de este sistema, puedes mantener un control eficiente sobre las labores docentes, asegurando que todas las actividades académicas, científicas, culturales y administrativas se lleven a cabo conforme a las normativas del programa.
                                </p>
                            </div>
                            <div className="col-sm">
                                <div className="image-content">
                                    <img src="/imagenes/VAgenda.svg" alt="Vector agenda" className="docente-vector" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Segunda sección */}
                    <section className="text-content">
                        <div className="d-sm-flex align-items-center justify-content-between">
                            <div className="col-sm">
                                <div className="image-content">
                                    <img src="/imagenes/VLista.svg" alt="Vector agenda" className="docente-vector-lista" />
                                </div>
                            </div>
                            <div className="col-md p-3">
                                <h4>Funcionalidades del Sistema para el Director de Programa</h4>
                                <p>
                                    Como Director de Programa, tienes acceso a varias funcionalidades clave:
                                </p>
                                <ul>
                                    <li>Revisar las agendas enviadas por los docentes, que incluyen detalles como el nombre, código, programa, fecha y periodo académico.</li>
                                    <li>Aprobar o rechazar las agendas según los criterios establecidos para el cumplimiento de las normativas académicas.</li>
                                    <li>Descargar las agendas en formato Excel para realizar un seguimiento más detallado y realizar análisis.</li>
                                    <li>Verificar el estado de cada agenda y su progreso a lo largo del proceso de aprobación.</li>
                                </ul>
                                <p>
                                    Este sistema está diseñado para ser intuitivo, permitiéndote gestionar las agendas de manera rápida y eficiente, con herramientas de descarga y actualización de estado de fácil acceso.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
