import React from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from './CartContext';

const Cart = () => {
  const { 
    cart, 
    removeItem, 
    clear, 
    updateItemQuantity, 
    getTotalPrice, 
    getTotalQuantity 
  } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 2 
    });
  };

  if (cart.length === 0) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center p-4">
              <Card.Body>
                <FaShoppingBag size={64} className="text-muted mb-3" />
                <Card.Title className="h3 mb-3">Tu carrito está vacío</Card.Title>
                <Card.Text className="text-muted mb-4">
                  ¡Descubre nuestros productos y encuentra lo que necesitas!
                </Card.Text>
                <Link to="/" className="btn btn-primary btn-lg">
                  Explorar productos
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <FaShoppingBag className="me-2" />
              Mi Carrito
              <Badge bg="primary" className="ms-2">
                {getTotalQuantity()} {getTotalQuantity() === 1 ? 'producto' : 'productos'}
              </Badge>
            </h2>
            <Button 
              variant="outline-danger" 
              onClick={clear}
              className="d-flex align-items-center"
            >
              <FaTrash className="me-1" />
              Vaciar carrito
            </Button>
          </div>

          <Row>
            <Col lg={8}>
              <Card>
                <Card.Body className="p-0">
                  <Table responsive className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Precio Unit.</th>
                        <th className="text-end">Subtotal</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                style={{ 
                                  width: '60px', 
                                  height: '60px', 
                                  objectFit: 'cover',
                                  borderRadius: '8px'
                                }}
                                className="me-3"
                              />
                              <div>
                                <h6 className="mb-1">{item.title}</h6>
                                <small className="text-muted text-capitalize">
                                  {item.category}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus size={10} />
                              </Button>
                              <span className="mx-3 fw-bold">{item.quantity}</span>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                <FaPlus size={10} />
                              </Button>
                            </div>
                          </td>
                          <td className="text-end align-middle">
                            {formatPrice(item.price)}
                          </td>
                          <td className="text-end align-middle">
                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                          </td>
                          <td className="text-center align-middle">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              title="Eliminar producto"
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="sticky-top" style={{ top: '20px' }}>
                <Card.Header>
                  <h5 className="mb-0">Resumen del pedido</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Productos ({getTotalQuantity()})</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span>Envío</span>
                    <span className="text-success">Gratis</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total</strong>
                    <strong className="text-primary fs-4">
                      {formatPrice(getTotalPrice())}
                    </strong>
                  </div>

                  <div className="d-grid gap-2">
                  <Link to="/checkout" className="btn btn-success btn-lg text-decoration-none">
                      Proceder al Checkout
                  </Link>
                    <Link to="/" className="btn btn-outline-primary">
                      Seguir comprando
                    </Link>
                  </div>
                </Card.Body>
              </Card>

              <Alert variant="info" className="mt-3">
                <small>
                  <strong>💡 Tip:</strong> Puedes modificar las cantidades directamente 
                  desde aquí o eliminar productos que ya no necesites.
                </small>
              </Alert>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;