import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../components/ProductSquare';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  const { category, subcategory } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('modelNumber');
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'price', label: 'Price' },
  ];
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    return savedItemsPerPage ? JSON.parse(savedItemsPerPage) : 25;
  });
  const itemsPerPageOptions = [10, 25, 50, 100, 'All'];

  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const modelMatch = product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());
  
    if (category === 'all') {
      return nameMatch || modelMatch;
    } else if (category === 'electrical') {
      return (
        product.category.toLowerCase() === 'electrical' &&
        (subcategory === null || product.subCategory.toLowerCase() === subcategory)
      );
    } else if (category === 'hardware') {
      return (
        product.category.toLowerCase() === 'hardware' &&
        (subcategory === null || product.subCategory.toLowerCase() === subcategory)
      );
    } else {
      return product.category.toLowerCase() === category;
    }
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

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
  const endIndex = itemsPerPage === 'All' ? sortedProducts.length : startIndex + itemsPerPage;

  return (
    <div>
      <div className="categories">
        <Link to="/category/electrical">Electrical</Link>
        <Link to="/category/hardware">Hardware</Link>
        <Link to="/category/all">All Products</Link>
      </div>
      <div className="currentCategory">
        {subcategory && (
          <h3>
            <Link to={`/category/${category}`}>{category}</Link> - {subcategory}
          </h3>
        )}
        {!subcategory && (
          <h3>
            <Link to={`/category/${category}`}>{category}</Link>
          </h3>
        )}
      </div>
      <div className="sort-options">
        <div className="items-per-page">
          <label htmlFor="items-per-page-select">Items per Page: </label>
          <select
            id="items-per-page-select"
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <form onSubmit={handleSearch}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="product-grid">
        {sortedProducts.slice(startIndex, endIndex).map((product) => (
          <div key={product.modelNumber} className="product-grid-item">
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
