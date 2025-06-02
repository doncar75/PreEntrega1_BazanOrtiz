// src/services/productService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'products';

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    throw error;
  }
};

// Agregar un nuevo producto
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error agregando producto:', error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (productId, productData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error);
    throw error;
  }
};

// Buscar productos por nombre
export const searchProducts = async (searchTerm) => {
  try {
    // Nota: Para búsquedas más complejas, considera usar Algolia o similar
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        products.push({
          id: doc.id,
          ...data
        });
      }
    });
    return products;
  } catch (error) {
    console.error('Error buscando productos:', error);
    throw error;
  }
};

// Obtener productos con límite y ordenamiento
export const getProductsWithPagination = async (limitCount = 10, orderField = 'createdAt') => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy(orderField, 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error('Error obteniendo productos con paginación:', error);
    throw error;
  }
};