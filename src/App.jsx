import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda online!" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;