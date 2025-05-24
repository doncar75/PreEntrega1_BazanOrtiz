import React, { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const handleIncrement = () => {
       if (quantity < stock) {
        setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock) {
      onAdd(quantity);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Contador de cantidad */}
      <div>
        <label className="form-label fw-bold">Cantidad:</label>
        <InputGroup className="mb-3" style={{ maxWidth: '150px' }}>
          <Button 
            variant="outline-secondary" 
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Form.Control 
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min="1"
            max={stock}
            className="text-center"
            style={{ maxWidth: '70px' }}
          />
          <Button 
            variant="outline-secondary" 
            onClick={handleIncrement}
            disabled={quantity >= stock}
          >
            +
          </Button>
        </InputGroup>
      </div>

      {/* Información de stock */}
      <div className="mb-3">
        <small className="text-muted">
          Stock disponible: <strong>{stock} unidades</strong>
        </small>
      </div>

      {/* Botón agregar al carrito */}
      <div className="d-grid">
        <Button 
          variant="primary" 
          size="lg"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </div>

      {/* Mensaje de stock bajo */}
      {stock > 0 && stock <= 5 && (
        <div className="alert alert-warning py-2 mb-0">
          <small>¡Últimas {stock} unidades disponibles!</small>
        </div>
      )}
    </div>
  );
};

export default ItemCount;