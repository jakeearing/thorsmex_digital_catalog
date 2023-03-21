import './style/app.css';
import React from 'react';
import Home from './Home';
import ProductPage from './components/ProductPage';
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
