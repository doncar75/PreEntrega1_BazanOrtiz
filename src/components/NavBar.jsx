import React from 'react';
import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* Logo en el margen izquierdo con navegación al home */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-top me-2"
            alt="Logo de la tienda"
          />
          DONCAR HOME STORE
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Categorías centradas con navegación */}
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/category/electronica">Electrónica</Nav.Link>
            <Nav.Link as={NavLink} to="/category/ropa">Ropa</Nav.Link>
            <Nav.Link as={NavLink} to="/category/hogar">Hogar</Nav.Link>
            <Nav.Link as={NavLink} to="/category/deportes">Deportes</Nav.Link>
          </Nav>
          
          {/* Campo de búsqueda */}
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Buscar productos..."
              className="me-2"
              aria-label="Buscar"
              size="sm"
            />
            <Button variant="outline-success" size="sm">Buscar</Button>
          </Form>
          
          {/* Botón de inicio de sesión y carrito */}
          <div className="d-flex align-items-center">
            <Button variant="outline-light" size="sm" className="me-3">
              Iniciar Sesión
            </Button>
            <CartWidget />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;