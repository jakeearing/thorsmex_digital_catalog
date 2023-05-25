import React, { useEffect, useState } from 'react';
import Products from './Products';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  const [category, setCategory] = useState('All Products');
  const [subCategory, setSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('modelNumber');
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'price', label: 'Price' },
  ];
  const[itemsPerPage, setItemsPerPage] = useState(() => {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    return savedItemsPerPage ? JSON.parse(savedItemsPerPage) : 25;
  });
  const itemsPerPageOptions = [10, 25, 50, 100, "All"];

  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  const filterProducts = (category, subCategory) => {
    setCategory(category);
    setSubCategory(subCategory);
  }

  const filteredProducts = category === 'All Products'
    ? products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const modelMatch = product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || modelMatch;
    })
    : products.filter(product => {
      if (category === 'Electrical') {
        return (
          product.category === 'Electrical' &&
          (subCategory === null || product.subCategory === subCategory)
        );
      } else if (category === 'Hardware') {
        return (
          product.category === 'Hardware' &&
          (subCategory === null || product.subCategory === subCategory)
        );
      } else {
        return product.category === category;
      }
    }).filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const modelMatch = product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || modelMatch;
    });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  };

  const startIndex = 0;
  const endIndex = itemsPerPage === "All" ? sortedProducts.length : startIndex + itemsPerPage;

  return (
    <div>
      <div className="categories">
        <h3 onClick={() => filterProducts('Electrical', null)}>Electrical</h3>
        <p onClick={() => filterProducts('Electrical', 'Wiring & Wiring Accessories')}>Wiring & Wiring Accessories</p>
        <p onClick={() => filterProducts('Electrical', 'Cable Clips & Staples')}>Cable Clips & Staples</p>
        <p onClick={() => filterProducts('Electrical', 'Raceway & Raceway Accessories')}>Raceway & Raceway Accessories</p>
        <h3 onClick={() => filterProducts('Hardware', null)}>Hardware</h3>
        <p onClick={() => filterProducts('Hardware', 'Anchors, Screws & Kits')}>Anchors, Screws & Kits</p>
        <h3 onClick={() => filterProducts('All Products')}>All Products</h3>
      </div>
      <div className="currentCategory">
        {subCategory && (
          <h3><a onClick={() => filterProducts(category, null)}>{category}</a> - {subCategory}</h3>
        )}
        {!subCategory && (
          <h3><a onClick={() => filterProducts(category, null)}>{category}</a></h3>
        )}
      </div>
      <div className="sort-options">
        <div className="items-per-page">
          <label htmlFor="items-per-page-select">Items per Page:</label>
          <select
            id="items-per-page-select"
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <form onSubmit={handleSearch}>
          <label htmlFor="search">Search: </label>
          <input type="text" id="search" name="search" value={searchTerm} onChange={handleSearchChange} />
        </form>
      </div>
      <div className="product-grid">
        {sortedProducts.slice(startIndex, endIndex).map(product => (
          <div key={product.modelNumber} className="product-grid-item">
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
