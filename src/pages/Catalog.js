import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../components/ProductSquare';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
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
  const [categoryState, setCategoryState] = useState({});

  // Function to toggle subcategories
  const toggleSubcategories = (categoryName) => {
    setCategoryState((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName]
    }));
  };

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
    } else if (subcategory) {
      return (
        product.category.toLowerCase() === category.toLowerCase() &&
        product.subCategory.toLowerCase() === subcategory.toLowerCase()
      );
    } else {
      return product.category.toLowerCase() === category.toLowerCase();
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

  // Handle items per page change
  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
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

  // Constants
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'price', label: 'Price' },
  ];
  const itemsPerPageOptions = [10, 25, 50, 100, sortedProducts.length];

  // Find all category and subcategories from the item list
  const categoryLinks = allCategories.map((category) => {
    const subcategories = allSubcategories
      .filter((subCategory) => products.some((product) => product.subCategory === subCategory && product.category === category))
      .map((subCategory) => ({ name: subCategory, link: `/${category}/${subCategory}` }));

    return {
      name: category,
      link: `/${category}`,
      subcategories: subcategories.length > 0 ? subcategories : undefined,
      showSubcategories: categoryState[category] || false
    };
  });

  // Create links for all categories/subcategories
  const generateCategoryLinks = (categories) => {
    return categories.map((category) => (
      <React.Fragment key={category.link}>
        <div className="category">
          <Link to={category.link}>{category.name}</Link>
          {category.subcategories && (
            <button
              className={`subcategories-toggle-button ${category.showSubcategories ? 'open' : ''}`}
              onClick={() => toggleSubcategories(category.name)}
            >
              &#x25BE;
            </button>
          )}
          {category.showSubcategories && category.subcategories && generateCategoryLinks(category.subcategories)}
        </div>
      </React.Fragment>
    ));
  };

  const renderedCategoryLinks = generateCategoryLinks(categoryLinks);

  const startIndex = 0;
  const endIndex = itemsPerPage === 'All' ? sortedProducts.length : startIndex + itemsPerPage;

  // Function to export filtered products as CSV
  const exportAsCSV = () => {
    const filteredData = sortedProducts.slice(startIndex, endIndex);
    const csvData = filteredData.map((product) => `${product.name},${product.modelNumber},${product.price}`);
    const csvString = 'Name,Model Number,Price\n' + csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Catalog - Charlotte Imports.csv');
  };

  // Function to export filtered products as PDF
  const createAndDownloadPDF = () => {
    const grid = document.querySelector('.product-grid');

    html2pdf()
      .set({
        margin: [12, 0, 12, 0],
        filename: 'Catalog - Charlotte Imports.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        page: {
          before: () => {
            // Increase the height of the page before rendering
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 100);
            });
          },
          after: () => {
            // Wait for the page to render completely before moving to the next page
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 200);
            });
          }
        }
      })
      .from(grid)
      .save();
  };

  // Function to export selected products as PDF
  const createAndDownloadSelectedPDF = () => {
    const selectedProducts = sortedProducts.filter((product) =>
      selectedItems.includes(product.modelNumber)
    );
    const grid = document.createElement('div');
    grid.className = 'product-grid';
    selectedProducts.forEach((product) => {
      const item = document.createElement('div');
      item.className = 'product-grid-item';
      item.innerHTML = `<Products product={product} images={images} />`;
      grid.appendChild(item);
    });

    html2pdf()
      .set({
        margin: [12, 0, 12, 0],
        filename: 'SelectedProducts.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        page: {
          before: () => {
            // Increase the height of the page before rendering
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 100);
            });
          },
          after: () => {
            // Wait for the page to render completely before moving to the next page
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 200);
            });
          }
        }
      })
      .from(grid)
      .save();
  };

  return (
    <div className="catalog-container">
      <div className="sidebar-wrapper">
        <div className="sidebar">
          <div className="sort-options">
            <div className="search-bar">
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
            <div className="sort-catalog">
              <label htmlFor="sort-select">Sort: </label>
              <select id="sort-select" value={sortOption} onChange={handleSortChange}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="items-per-page">
              <label htmlFor="items-per-page-select">Show: </label>
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
          </div>
          <div className="sidebar-heading">
            <h3>Product Categories</h3>
          </div>
          {renderedCategoryLinks}
          <div className="category">
            <Link to="/">All Products</Link>
          </div>
          <div className="sidebar-heading">
            <h3>Export Catalog</h3>
          </div>
          <div className="export-container">
            <div className="export-csv">
              <button onClick={exportAsCSV} className="icon-button">
                <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
              </button>
            </div>

            <div className="export-pdf">
              <button onClick={createAndDownloadPDF} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>

            <div className="export-selected-pdf">
              <button onClick={createAndDownloadSelectedPDF} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="products-wrapper">
        <div className="current-category">
          <h3>
            <Link to="/">Products</Link>
            {category && <span> / </span>}
            {category && subcategory && (
              <span>
                <Link to={`/${category}`}>{category}</Link> / {subcategory}
              </span>
            )}
            {category && !subcategory && (
              <span>
                <Link to={`/${category}`}>{category}</Link>
              </span>
            )}
          </h3>
        </div>
        <div className="product-grid">
          {sortedProducts.slice(startIndex, endIndex).map((product) => (
            <div key={product.modelNumber} className="product-grid-item">
              <Products product={product} images={images} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
