import React, { useEffect, useState } from 'react';
import Products from './Products';
import '../style/catalog.css';

function Catalog() {
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    setCategory(category);
  }

  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

  return (
    <div>
      <div className="categories">
        <h3 onClick={() => filterProducts('Electrical')}>Electrical</h3>
        <h3 onClick={() => filterProducts('Hardware')}>Hardware</h3>
        <h3 onClick={() => filterProducts('all')}>All</h3>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-grid-item">
            <Products product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;