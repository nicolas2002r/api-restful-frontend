import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'; 
import { Table, Button, Modal, Form } from 'react-bootstrap'; 
import Swal from 'sweetalert2'; 
import { CheckboxDropdown } from '../components/UI/CheckboxDropdown'; // Asegúrate de tener este componente disponible
import '../index.css'; 

export const LaboresDocencia = forwardRef((props, ref) => {
  // Hook de estado para controlar la visibilidad del modal.
  const [showModal, setShowModal] = useState(false);

  // Estado para manejar las entradas (registros) en la tabla.
  const [entries, setEntries] = useState([]);
  
  // Estado para saber cuál fila está seleccionada.
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // Estado para manejar la información del formulario cuando se agrega una nueva entrada.
  const [newEntry, setNewEntry] = useState({
    asignatura: '',
    programa: '',
    grupo: '', 
    sede: '',
    horasSemanales: '', 
    horasSemestre: ''  
  });

  const handleClose = () => setShowModal(false);

  // Función para mostrar el modal.
  const handleShow = () => setShowModal(true);

  // Función para manejar los cambios en los campos del formulario.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación: si el campo es 'horasSemanales' y el valor es negativo, no lo actualiza.
    if (name === 'horasSemanales') {
      const numValue = parseFloat(value);
      if (numValue < 0) return;
    }

    // Actualiza el estado del formulario con los nuevos valores.
    setNewEntry({ ...newEntry, [name]: value });
  };

  // Función para agregar una nueva entrada (asignatura) a la tabla.
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

  // Función para eliminar la entrada seleccionada en la tabla.
  const EliminarEntrada = () => {
    if (selectedRowIndex !== null) { 
      const updatedEntries = [...entries];
      updatedEntries.splice(selectedRowIndex, 1);
      setEntries(updatedEntries); 
      setSelectedRowIndex(null);
    }
  };

  // Función para calcular el total de horas (semanales o semestrales) de todas las entradas.
  const calcularTotalHoras = (tipo) => {
    return entries.reduce((total, entry) => {
      return total + (parseFloat(entry[tipo]) || 0);
    }, 0);
  };

  // Calcula el total de horas semanales y del semestre de todas las entradas.
  const totalHorasSemanales = calcularTotalHoras('horasSemanales');
  const totalHorasSemestre = calcularTotalHoras('horasSemestre');

  // Añadir método para obtener las entradas
  useImperativeHandle(ref, () => ({
    // Función para vaciar todas las actividades (limpiar las entradas).
    vaciarActividades() {
      setEntries([]);
      localStorage.removeItem('laboresDocencia'); // Eliminar también del LocalStorage
      setSelectedRowIndex(null);
    },
    // Función para obtener la cantidad de entradas actuales.
    getEntriesCount() {
      return entries.length;
    },
    getEntries() {
      return entries;
    }
  }));

  // Función para seleccionar una fila al hacer clic en ella.
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
