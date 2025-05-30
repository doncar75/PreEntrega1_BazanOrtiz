import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; 

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  // Solo mostrar el widget si hay productos en el carrito
  if (totalQuantity === 0) {
    return (
      <Link to="/cart" className="text-decoration-none">
        <div className="d-flex align-items-center">
          <FaShoppingCart size={20} color="white" />
          <Badge bg="secondary" className="ms-1" pill>
            0
          </Badge>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/cart" className="text-decoration-none">
      <div className="d-flex align-items-center">
        <FaShoppingCart size={20} color="white" />
        <Badge bg="danger" className="ms-1" pill>
          {totalQuantity}
        </Badge>
      </div>
    </Link>
  );
};

export default CartWidget;