import React from 'react';
import { Row } from 'react-bootstrap';
import Item from './Item';

const ItemList = ({ products }) => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {products.length > 0 ? (
        products.map(product => (
          <Item key={product.id} product={product} />
        ))
      ) : (
        <div className="col-12 text-center">
          <p className="alert alert-info">No hay productos disponibles</p>
        </div>
      )}
    </Row>
  );
};

export default ItemList;