import React, { createContext, useContext, useState } from 'react';

// Crear el Context
const CartContext = createContext();

// Hook personalizado para usar el context más fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

// Provider del Context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar producto al carrito
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      // Si el producto no está en el carrito, lo agregamos
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      // Si ya está, actualizamos la cantidad
      setCart(prev => 
        prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    }
  };

  // Función para remover un producto completamente del carrito
  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  // Función para limpiar todo el carrito
  const clear = () => {
    setCart([]);
  };

  // Función para verificar si un producto está en el carrito
  const isInCart = (itemId) => {
    return cart.some(item => item.id === itemId);
  };

  // Función para obtener la cantidad de un producto específico en el carrito
  const getItemQuantity = (itemId) => {
    const item = cart.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Función para actualizar la cantidad de un producto (para el carrito)
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Calcular cantidad total de productos (suma de todas las cantidades)
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcular precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener cantidad de productos únicos (tipos diferentes de productos)
  const getTotalItems = () => {
    return cart.length;
  };

  // Valor que se compartirá con todos los componentes
  const value = {
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    getItemQuantity,
    updateItemQuantity,
    getTotalQuantity,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;