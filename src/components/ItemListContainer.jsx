import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const ItemListContainer = ({ greeting }) => {
  return (
    <Container className="mt-4">
      <Alert variant="info">
        <h3 className="text-center">{greeting}</h3>
      </Alert>
    </Container>
  );
};

export default ItemListContainer;