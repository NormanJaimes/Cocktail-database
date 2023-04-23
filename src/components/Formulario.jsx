import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import useCategoria from '../hooks/useCategorias';
import useBebidas from '../hooks/useBebidas';
import { useState } from 'react';

export default function Formulario() {
  const [busqueda, setBusqueda] = useState({ nombre: '', categoria: '' });
  const [alerta, setAlerta] = useState('');
  const { categorias } = useCategoria();
  const { consultarBebidas } = useBebidas();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setAlerta('');
    consultarBebidas(busqueda);
  };
  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center">
          {alerta}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre Bebidas</Form.Label>
            <Form.Control
              id="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="nombre"
              value={busqueda.nombre}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Categoría Bebidas</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="">- Selecciona Categoría -</option>
              {categorias.map((categoria) => (
                <option
                  value={categoria.strCategory}
                  key={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            variant="danger"
            type="submit"
            className="text-uppercase w-100"
          >
            Buscar Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
