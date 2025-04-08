import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';

const CartWidget = () => {
  return (
    <div className="d-flex align-items-center">
      <FaShoppingCart size={20} color="white" />
      <Badge bg="danger" className="ms-1" pill>
        5
      </Badge>
    </div>
  );
};

export default CartWidget;