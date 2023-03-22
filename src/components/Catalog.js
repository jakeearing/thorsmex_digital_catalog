import React, { useState } from 'react';
import Products from './Products';
import ProductModel from './ProductModel';
import '../style/catalog.css';

export default function Catalog() {
  const [category, setCategory] = useState('all');

  const filterProducts = (category) => {
    setCategory(category);
  }

  const filteredProducts = category === 'all' ? ProductModel : ProductModel.filter(product => product.category === category);

  return (
    <div>
      <div className="categories">
        <h3 onClick={() => filterProducts('all')}>All</h3>
        <h3 onClick={() => filterProducts('Electrical')}>Electrical</h3>
        <h3 onClick={() => filterProducts('Hardware')}>Hardware</h3>
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