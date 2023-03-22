import React from 'react';
import Home from './Home';
import Product from './Product';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/products/:modelnumber" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
