// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
} from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los productos
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos por categoría
  const loadProductsByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await getProductsByCategory(category);
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar productos
  const searchProductsHandler = async (searchTerm) => {
    if (!searchTerm.trim()) {
      await loadProducts();
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const productsData = await searchProducts(searchTerm);
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto
  const addProductHandler = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProductId = await addProduct(productData);
      await loadProducts(); // Recargar la lista
      return newProductId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProductHandler = async (productId, productData) => {
    setLoading(true);
    setError(null);
    try {
      await updateProduct(productId, productData);
      await loadProducts(); // Recargar la lista
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProductHandler = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    loadProducts,
    loadProductsByCategory,
    searchProducts: searchProductsHandler,
    addProduct: addProductHandler,
    updateProduct: updateProductHandler,
    deleteProduct: deleteProductHandler
  };
};

// Hook para un producto individual
export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    if (!productId) return;
    
    setLoading(true);
    setError(null);
    try {
      const productData = await getProductById(productId);
      setProduct(productData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch: loadProduct
  };
};