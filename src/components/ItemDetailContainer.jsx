import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { getProductById } from '../services/productService';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    const fetchProduct = async () => {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <Row>
          <Col>
            {product ? (
              <ItemDetail product={product} />
            ) : (
              <div className="alert alert-warning">
                Producto no encontrado
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ItemDetailContainer;