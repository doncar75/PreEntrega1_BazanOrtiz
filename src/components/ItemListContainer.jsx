import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getProductsByCategory } from '../services/productService';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    
    const fetchProducts = async () => {
      try {
        let result;
        if (categoryId) {
          result = await getProductsByCategory(categoryId);
        } else {
          result = await getProducts();
        }
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Container className="mt-4">
      {greeting && (
        <Alert variant="info">
          <h3 className="text-center">{greeting}</h3>
        </Alert>
      )}
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <Row>
          <Col>
            <ItemList products={products} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ItemListContainer;