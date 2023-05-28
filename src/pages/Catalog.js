import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../components/ProductSquare';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  // State variables
  const { category, subcategory } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('modelNumber');
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    return savedItemsPerPage ? JSON.parse(savedItemsPerPage) : 25;
  });

  // Constants
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'price', label: 'Price' },
  ];
  const itemsPerPageOptions = [10, 25, 50, 100, 'All'];

  // Update local storage when itemsPerPage changes
  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  // Get all unique categories and subcategories from products
  const allCategories = [...new Set(products.map((product) => product.category))];
  const allSubcategories = [...new Set(products.map((product) => product.subCategory))];

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const modelMatch = product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (category === 'all') {
      return nameMatch || modelMatch;
    } else if (category === 'electrical') {
      return (
        product.category.toLowerCase() === 'electrical' &&
        (subcategory === undefined || product.subCategory.toLowerCase() === subcategory)
      );
    } else if (category === 'hardware') {
      return (
        product.category.toLowerCase() === 'hardware' &&
        (subcategory === undefined || product.subCategory.toLowerCase() === subcategory)
      );
    } else {
      return product.category.toLowerCase() === category;
    }
  });

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle search form submission
  const handleSearch = (event) => {
    event.preventDefault();
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sort products based on sort option
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

  // Handle items per page change
  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  };

  // Find all category and subcategories from the item list
  const categoryLinks = allCategories.map((category) => {
    const subcategories = allSubcategories
      .filter((subCategory) => products.some((product) => product.subCategory === subCategory && product.category === category))
      .map((subCategory) => ({ name: subCategory, link: `/${category}/${subCategory}` }));

    return {
      name: category,
      link: `/${category}`,
      subcategories: subcategories.length > 0 ? subcategories : undefined
    };
  });

  // Create links for all categories/subcategories 
  const generateCategoryLinks = (categories) => {
    return categories.map((category) => (
      <React.Fragment key={category.link}>
        <Link to={category.link}>{category.name}</Link>
        {category.subcategories && generateCategoryLinks(category.subcategories)}
      </React.Fragment>
    ));
  };

  const renderedCategoryLinks = generateCategoryLinks(categoryLinks);

  const startIndex = 0;
  const endIndex = itemsPerPage === 'All' ? sortedProducts.length : startIndex + itemsPerPage;

  return (
    <div className="catalog-container">
      <div className="categories">
        {renderedCategoryLinks}
      </div>
      <div className="currentCategory">
        {subcategory && (
          <h3>
            <Link to={`/${category}/${subcategory}`}>{category}</Link> - {subcategory}
          </h3>
        )}
        {!subcategory && (
          <h3>
            <Link to={`/${category}`}>{category}</Link>
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
