import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaLock } from 'react-icons/fa';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cart, getTotalPrice, getTotalQuantity, clear } = useCart();
  const navigate = useNavigate();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    // Validar confirmación de email
    if (!formData.emailConfirm.trim()) {
      newErrors.emailConfirm = 'Debe confirmar el email';
    } else if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = 'Los emails no coinciden';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    // Validar dirección
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es obligatoria';
    }

    // Validar ciudad
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es obligatoria';
    }

    // Validar código postal
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Formatear precio
  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 2 
    });
  };

  // Simular envío de orden (aquí se integrará Firebase)
  const submitOrder = async () => {
    try {
      setIsSubmitting(true);
      
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear objeto de orden
      const order = {
        buyer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        total: getTotalPrice(),
        date: new Date().toISOString(),
        status: 'pending'
      };

      // Simular ID de orden generado
      const generatedOrderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      console.log('Orden creada:', order);
      
      // Limpiar carrito
      clear();
      
      // Mostrar éxito
      setOrderId(generatedOrderId);
      setOrderSuccess(true);
      
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      alert('Hubo un error al procesar tu orden. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      submitOrder();
    }
  };

  // Si el carrito está vacío, redirigir
  if (cart.length === 0 && !orderSuccess) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center p-4">
              <Card.Body>
                <FaShoppingBag size={64} className="text-muted mb-3" />
                <Card.Title className="h3 mb-3">No hay productos para checkout</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Agrega productos a tu carrito antes de proceder al checkout.
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

  // Mostrar confirmación de orden exitosa
  if (orderSuccess) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center p-4 border-success">
              <Card.Body>
                <div className="text-success mb-3">
                  <FaLock size={64} />
                </div>
                <Card.Title className="h3 mb-3 text-success">¡Orden Confirmada!</Card.Title>
                <Card.Text className="mb-3">
                  Tu orden ha sido procesada exitosamente.
                </Card.Text>
                <Card.Text className="mb-4">
                  <strong>ID de Orden: {orderId}</strong>
                </Card.Text>
                <Card.Text className="text-muted mb-4">
                  Recibirás un email de confirmación en {formData.email} con los detalles de tu compra.
                </Card.Text>
                <div className="d-grid gap-2">
                  <Link to="/" className="btn btn-primary btn-lg">
                    Continuar comprando
                  </Link>
                </div>
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
          <h2 className="mb-4">
            <FaLock className="me-2" />
            Checkout
          </h2>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Formulario de datos */}
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUser className="me-2" />
                  Información de contacto
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.firstName}
                        placeholder="Ingresa tu nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.lastName}
                        placeholder="Ingresa tu apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaEnvelope className="me-1" />
                        Email *
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                        placeholder="tu@email.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="emailConfirm"
                        value={formData.emailConfirm}
                        onChange={handleInputChange}
                        isInvalid={!!errors.emailConfirm}
                        placeholder="Confirma tu email"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.emailConfirm}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaPhone className="me-1" />
                    Teléfono *
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="+54 11 1234-5678"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaMapMarkerAlt className="me-2" />
                  Dirección de entrega
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Calle, número, piso, depto"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        isInvalid={!!errors.city}
                        placeholder="Ciudad"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal *</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        isInvalid={!!errors.postalCode}
                        placeholder="1234"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Resumen de la orden */}
          <Col lg={4}>
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Header>
                <h5 className="mb-0">
                  <FaShoppingBag className="me-2" />
                  Resumen de la orden
                </h5>
              </Card.Header>
              <Card.Body>
                {/* Lista de productos */}
                <div className="mb-3">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                          className="me-2"
                        />
                        <div>
                          <small className="fw-bold d-block">{item.title}</small>
                          <small className="text-muted">Cant: {item.quantity}</small>
                        </div>
                      </div>
                      <small className="fw-bold">
                        {formatPrice(item.price * item.quantity)}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2">
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
                  <strong className="text-primary fs-5">
                    {formatPrice(getTotalPrice())}
                  </strong>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="success" 
                    size="lg" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Procesando...
                      </>
                    ) : (
                      'Confirmar Orden'
                    )}
                  </Button>
                  <Link to="/cart" className="btn btn-outline-secondary">
                    Volver al carrito
                  </Link>
                </div>
              </Card.Body>
            </Card>

            <Alert variant="info" className="mt-3">
              <small>
                <FaLock className="me-1" />
                <strong>Compra segura:</strong> Tus datos están protegidos con encriptación SSL.
              </small>
            </Alert>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;