import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <Col>
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="text-muted mb-2">
            {product.category}
          </Card.Text>
          <Card.Text className="mb-2">
            ${product.price.toFixed(2)}
          </Card.Text>
          <div className="mt-auto">
            <Link to={`/item/${product.id}`}>
              <Button variant="primary" className="w-100">Ver detalles</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Item;