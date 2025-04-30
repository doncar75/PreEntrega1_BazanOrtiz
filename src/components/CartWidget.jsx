import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  // Por ahora usamos un número hardcodeado como se pidió en la consigna
  const itemCount = 5;

  return (
    <Link to="/cart" className="text-decoration-none">
      <div className="d-flex align-items-center">
        <FaShoppingCart size={20} color="white" />
        <Badge bg="danger" className="ms-1" pill>
          {itemCount}
        </Badge>
      </div>
    </Link>
  );
};

export default CartWidget;