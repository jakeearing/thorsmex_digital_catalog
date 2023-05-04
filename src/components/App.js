import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Product from './Product';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images/product-images', false, /\.(png|jpe?g|svg)$/));

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      fetch("http://localhost:5000/api/import");
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home products={products} images={images} />} />
        <Route path="/products/:modelnumber" element={<Product products={products} images={images} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
