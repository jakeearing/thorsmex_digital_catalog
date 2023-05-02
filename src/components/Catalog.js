import React, { useEffect, useState } from 'react';
import Products from './Products';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  const [category, setCategory] = useState('all');

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
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
