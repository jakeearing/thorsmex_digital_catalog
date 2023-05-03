import React, { useEffect, useState } from 'react';
import Products from './Products';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  const [category, setCategory] = useState('all');
  const [sortOption, setSortOption] = useState('modelNumber');
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'price', label: 'Price' },
  ];

  const filterProducts = (category) => {
    setCategory(category);
  }

  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'modelNumber') {
      return a.modelNumber.localeCompare(b.modelNumber);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="categories">
        <h3 onClick={() => filterProducts('Electrical')}>Electrical</h3>
        <h3 onClick={() => filterProducts('Hardware')}>Hardware</h3>
        <h3 onClick={() => filterProducts('all')}>All</h3>
      </div>
      <div className="sort-options">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="product-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-grid-item">
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
