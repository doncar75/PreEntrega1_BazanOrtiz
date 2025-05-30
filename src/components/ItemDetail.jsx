import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from './CartContext';

const ItemDetail = ({ product }) => {
  const { addItem, getItemQuantity } = useCart();
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    
    // Agregar al carrito usando el context
    addItem(product, quantity);
    
    console.log(`Agregado al carrito: ${quantity} unidades de ${product.title}`);
  };

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
                <span className="text-muted text-capitalize">{product.category}</span>
              </Link>
            </div>
            
            <Card.Title as="h3" className="mb-3">{product.title}</Card.Title>
            
            <Card.Text className="fs-4 fw-bold mb-4 text-success">
              ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </Card.Text>
            
            <Card.Text className="mb-4">
              {product.description}
            </Card.Text>

            {/* Selector de cantidad y botón agregar */}
            {quantityAdded === 0 ? (
              <ItemCount 
                stock={product.stock} 
                initial={1} 
                onAdd={handleOnAdd} 
              />
            ) : (
              <div className="d-flex flex-column gap-3">
                <div className="alert alert-success">
                  ✅ {quantityAdded} {quantityAdded === 1 ? 'producto agregado' : 'productos agregados'} al carrito
                </div>
                <div className="d-grid gap-2">
                  <Link to="/cart" className="btn btn-primary btn-lg">
                    Ir al carrito
                  </Link>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setQuantityAdded(0)}
                  >
                    Agregar más unidades
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Link to="/" className="btn btn-outline-secondary">
                ← Volver al catálogo
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemDetail;