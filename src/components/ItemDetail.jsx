import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemDetail = ({ product }) => {
  return (
    <Card className="border-0">
      <Row className="g-0">
        <Col md={6}>
          <Card.Img 
            src={product.imageUrl} 
            alt={product.title} 
            className="img-fluid rounded" 
          />
        </Col>
        <Col md={6}>
          <Card.Body>
            <div className="mb-3">
              <Link to={`/category/${product.category}`} className="text-decoration-none">
                <span className="text-muted">{product.category}</span>
              </Link>
            </div>
            <Card.Title as="h3" className="mb-3">{product.title}</Card.Title>
            <Card.Text className="fs-4 fw-bold mb-4">
              ${product.price.toFixed(2)}
            </Card.Text>
            <Card.Text className="mb-4">
              {product.description}
            </Card.Text>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Agregar al carrito
              </Button>
              <Link to="/" className="btn btn-outline-secondary">
                Volver al catálogo
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemDetail;