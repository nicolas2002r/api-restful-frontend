import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown'; // Asegúrate de tener este componente disponible
import '../index.css';

export const LaboresDocencia = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [newEntry, setNewEntry] = useState({
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    horasSemanales: '',
    horasSemestre: ''
  });

  // Efecto para cargar datos de LocalStorage cuando se carga el componente
  useEffect(() => {
    const savedEntries = localStorage.getItem('laboresDocencia');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Efecto para guardar datos en LocalStorage cada vez que entries cambie
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('laboresDocencia', JSON.stringify(entries));
    }
  }, [entries]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'horasSemanales') {
      const numValue = parseFloat(value);
      if (numValue < 0) return;
    }

    setNewEntry({ ...newEntry, [name]: value });
  };

  const AgregarEntrada = (e) => {
    e.preventDefault();
    const horasSemestre = Math.round(newEntry.horasSemanales * 16);

    const updatedEntries = [...entries, { ...newEntry, horasSemestre }];
    setEntries(updatedEntries);

    setNewEntry({
      asignatura: '',
      programa: '',
      grupo: '',
      sede: '',
      horasSemanales: '',
      horasSemestre: ''
    });
    handleClose();
  };

  const EliminarEntrada = () => {
    if (selectedRowIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries.splice(selectedRowIndex, 1);
      setEntries(updatedEntries);
      setSelectedRowIndex(null);
    }
  };

  const calcularTotalHoras = (tipo) => {
    return entries.reduce((total, entry) => {
      return total + (parseFloat(entry[tipo]) || 0);
    }, 0);
  };

  const totalHorasSemanales = calcularTotalHoras('horasSemanales');
  const totalHorasSemestre = calcularTotalHoras('horasSemestre');

  // Añadir método para obtener las entradas
  useImperativeHandle(ref, () => ({
    vaciarActividades() {
      setEntries([]);
      localStorage.removeItem('laboresDocencia'); // Eliminar también del LocalStorage
      setSelectedRowIndex(null);
    },
    getEntriesCount() {
      return entries.length;
    },
    getEntries() {
      return entries;
    }
  }));

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };

  return (
    <div className="p-4">
      <h5 className="text-xl font-bold mb-4">Orientación de Clases - Docencia</h5>
      <div className="mb-3">
        <Button variant="success" onClick={handleShow} className="me-2">
          <i className="fas fa-plus"></i> Agregar
        </Button>
        <Button variant="danger" onClick={EliminarEntrada}>
          <i className="fas fa-trash"></i> Eliminar
        </Button>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th className="border border-gray-300 p-4 header-cell">Nombre de la asignatura</th>
            <th className="border border-gray-200 p-4 header-cell">Programa</th>
            <th className="border border-gray-200 p-4 header-cell">Grupo</th>
            <th className="border border-gray-200 p-4 header-cell">Sede</th>
            <th className="border border-gray-200 p-4 header-cell">Dedicación (Horas Semanales)</th>
            <th className="border border-gray-200 p-4 header-cell">Dedicación (Horas Semestrales)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)}
              className={selectedRowIndex === index ? 'selected-row' : ''}
            >
              <td>{entry.asignatura}</td>
              <td>{entry.programa}</td>
              <td>{entry.grupo}</td>
              <td>{entry.sede}</td>
              <td>{entry.horasSemanales}</td>
              <td>{entry.horasSemestre}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-center font-weight-bold">TOTAL</td>
            <td>{totalHorasSemanales}</td>
            <td>{totalHorasSemestre}</td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AgregarEntrada}>
            <Form.Group className="mb-3">
              <Form.Label>Programa</Form.Label>
              <CheckboxDropdown
                options={['Ingeniería de Sistemas', 'Ingeniería Electrónica', 'Ingeniería Industrial']}
                selectedOption={newEntry.programa}
                onOptionChange={(value) => setNewEntry({ ...newEntry, programa: value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre de la asignatura</Form.Label>
              <CheckboxDropdown
                options={['Matemáticas', 'Física', 'Programación', 'Diseño de Software']}
                selectedOption={newEntry.asignatura}
                onOptionChange={(value) => setNewEntry({ ...newEntry, asignatura: value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grupo</Form.Label>
              <CheckboxDropdown
                options={['Grupo A', 'Grupo B', 'Grupo C']}
                selectedOption={newEntry.grupo}
                onOptionChange={(value) => setNewEntry({ ...newEntry, grupo: value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sede</Form.Label>
              <CheckboxDropdown
                options={['Sede Principal', 'Sede Norte', 'Sede Sur']}
                selectedOption={newEntry.sede}
                onOptionChange={(value) => setNewEntry({ ...newEntry, sede: value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dedicación (Horas semanales)</Form.Label>
              <Form.Control
                type="number"
                name="horasSemanales"
                value={newEntry.horasSemanales}
                onChange={handleInputChange}
                min="0"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
});
