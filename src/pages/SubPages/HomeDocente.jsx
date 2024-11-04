import React from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import '../../index.css'; // Asegúrate de que la ruta del CSS sea correcta

export const HomeDocente = () => {
    return (
        <div className="container mt-4 home-docente-content">
            <h3>Bienvenido a la Agenda Docente</h3>
            <div className="content-wrapper">
                {/* Primera sección */}
                <div className="container overflow-container">
                    <section className="text-content">

                        <div className="d-sm-flex align-items-center justify-content-between">
                            <div className="col-md p-3">
                                <p>
                                    La <strong>Agenda Docente</strong> es una herramienta diseñada para facilitar la gestión de actividades docentes de una manera simple y automatizada.
                                    El sistema permite a los profesores registrar y gestionar sus horas de acuerdo a las labores académicas, actividades científicas, culturales y administrativas, asegurando el cumplimiento de sus compromisos institucionales teniendo en cuenta los lineamientos de la institución.
                                </p>
                                <p>
                                    Esta herramienta no solo mejora la organización personal de los docentes, sino que también permite a las instituciones educativas llevar un control más eficiente de las labores asignadas a cada profesor.
                                    Desde registrar asignaturas hasta enviar reportes completos, la Agenda Docente está diseñada para agilizar el trabajo administrativo y académico.
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
                                <h4>Funcionalidades del Sistema</h4>
                                <p>
                                    La Agenda Docente permite a los docentes realizar diversas funciones:
                                </p>
                                <ul>
                                    <li>Registrar asignaturas y horarios de clases.</li>
                                    <li>Registrar y gestionar horas de actividades académicas, científicas y culturales.</li>
                                    <li>Generar reportes de actividades realizadas y horas dedicadas.</li>
                                    <li>Controlar el cumplimiento de compromisos académicos e institucionales.</li>
                                    <li>Facilitar la comunicación con la administración a través de reportes y solicitudes.</li>
                                </ul>
                                <p>
                                    Además, el sistema está diseñado para ser intuitivo y fácil de usar, permitiendo a los docentes concentrarse en sus actividades académicas sin preocuparse por la gestión administrativa.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
