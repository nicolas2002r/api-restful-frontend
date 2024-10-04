import React, { useState, forwardRef, useImperativeHandle } from 'react'; 
import { Table, Button, Modal, Form } from 'react-bootstrap'; 
import Swal from 'sweetalert2'; 
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

  // Función para cerrar el modal.
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

    // Actualiza el estado con la nueva entrada y reinicia el formulario.
    setEntries([...entries, { ...newEntry, horasSemestre }]);
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

  useImperativeHandle(ref, () => ({
    // Función para vaciar todas las actividades (limpiar las entradas).
    vaciarActividades() {
      setEntries([]);
      setSelectedRowIndex(null);
    },
    // Función para obtener la cantidad de entradas actuales.
    getEntriesCount() {
      return entries.length;
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
              <Form.Select
                name="programa"
                value={newEntry.programa}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un programa</option>
                <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre de la asignatura</Form.Label>
              <Form.Select
                name="asignatura"
                value={newEntry.asignatura}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una asignatura</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Física">Física</option>
                <option value="Programación">Programación</option>
                <option value="Diseño de Software">Diseño de Software</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grupo</Form.Label>
              <Form.Select
                name="grupo"
                value={newEntry.grupo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un grupo</option>
                <option value="Grupo A">Grupo A</option>
                <option value="Grupo B">Grupo B</option>
                <option value="Grupo C">Grupo C</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sede</Form.Label>
              <Form.Select
                name="sede"
                value={newEntry.sede}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una sede</option>
                <option value="Sede Principal">Sede Principal</option>
                <option value="Sede Norte">Sede Norte</option>
                <option value="Sede Sur">Sede Sur</option>
              </Form.Select>
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
