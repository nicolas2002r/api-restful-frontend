import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Dropdown, Button, Table, Modal, Form } from 'react-bootstrap';
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

  useEffect(() => {
    props.actualizarTotales();
  }, [entries]); // Cada vez que cambien las entradas, actualiza los totales
  
  // Cargar las entradas desde localStorage al montar el componente
  useEffect(() => {
    const storedEntries = localStorage.getItem('laboresDocencia');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  // Guardar las entradas en localStorage cada vez que cambien
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
      if (isNaN(numValue) || numValue < 0) return;
    }

    setNewEntry({ ...newEntry, [name]: value });
  };

  const calcularTotalHoras = (tipo) => {
    if (!entries || entries.length === 0) return 0;

    return entries.reduce((total, entry) => {
      const horas = parseFloat(entry[tipo]);
      return total + (!isNaN(horas) ? horas : 0);
    }, 0);
  };

  const AgregarEntrada = (e) => {
    e.preventDefault();

    const horasSemanalesNum = parseFloat(newEntry.horasSemanales);
    if (isNaN(horasSemanalesNum)) {
      Swal.fire('Error', 'Por favor ingresa un valor válido para las horas semanales', 'error');
      return;
    }

    const horasSemestre = Math.round(horasSemanalesNum * 16);

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
      localStorage.setItem('laboresDocencia', JSON.stringify(updatedEntries)); // Actualizar localStorage
    }
  };

  const totalHorasSemanalesDocencia = calcularTotalHoras('horasSemanales');
  const totalHorasSemestreDocencia = calcularTotalHoras('horasSemestre');

  useImperativeHandle(ref, () => ({
    vaciarActividades() {
      setEntries([]);
      localStorage.removeItem('laboresDocencia');
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
            <td>{totalHorasSemanalesDocencia}</td>
            <td>{totalHorasSemestreDocencia}</td>
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
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {newEntry.programa || 'Seleccione un programa'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {['Ingeniería de Sistemas', 'Ingeniería Electrónica', 'Ingeniería Industrial'].map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setNewEntry({ ...newEntry, programa: option })}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre de la asignatura</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {newEntry.asignatura || 'Seleccione una asignatura'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {['Matemáticas', 'Física', 'Programación', 'Diseño de Software'].map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setNewEntry({ ...newEntry, asignatura: option })}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grupo</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {newEntry.grupo || 'Seleccione un grupo'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {['Grupo A', 'Grupo B', 'Grupo C'].map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setNewEntry({ ...newEntry, grupo: option })}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sede</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {newEntry.sede || 'Seleccione una sede'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {['Sede Principal', 'Sede Norte', 'Sede Sur'].map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setNewEntry({ ...newEntry, sede: option })}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
