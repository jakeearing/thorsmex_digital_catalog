import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './home';
import ProductPage from './ProductPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/ProductPage/:modelnumber" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
