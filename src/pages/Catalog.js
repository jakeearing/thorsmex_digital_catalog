import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductSquare from '../components/ProductSquare';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import '../assets/styles/catalog.css';

function Catalog({ products, images }) {
  const { category, subcategory } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('modelNumber');
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    return savedItemsPerPage ? JSON.parse(savedItemsPerPage) : 25;
  });
  const [prevItemsPerPage, setPrevItemsPerPage] = useState(itemsPerPage);
  const [categoryState, setCategoryState] = useState({});
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const savedSelectedProducts = localStorage.getItem('selectedProducts');
    return savedSelectedProducts ? JSON.parse(savedSelectedProducts) : [];
  });
  const [exportAll, setExportAll] = useState(false);

  // Function to toggle subcategories
  const toggleSubcategories = (categoryName) => {
    setCategoryState((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName]
    }));
  };

  // Get all unique categories and subcategories from products
  const allCategories = [...new Set(products.map((product) => product.category))];
  const allSubcategories = [...new Set(products.map((product) => product.subCategory))];

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const modelMatch = product.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (category === 'all') {
      return (
        (subcategory && product.subCategory.toLowerCase() === subcategory.toLowerCase()) ||
        (!subcategory && (nameMatch || modelMatch))
      );
    } else if (subcategory) {
      return (
        product.category.toLowerCase() === category.toLowerCase() &&
        product.subCategory.toLowerCase() === subcategory.toLowerCase()
      );
    } else {
      return product.category.toLowerCase() === category.toLowerCase();
    }
  });

  // Set the options users have to sort the catalog
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'modelNumber', label: 'Model Number' },
    { value: 'unit_cost', label: 'Unit Cost' },
  ];

  // Calculate the highest value for itemsPerPage based on the total number of items
  const totalItems = filteredProducts.length;
  const highestValue = Math.ceil(totalItems / 100) * 100;

  // Generate itemsPerPage options
  const itemsPerPageOptions = [];
  const baseOptions = [10, 25, 50];
  const increment = 100;

  // Add base options
  itemsPerPageOptions.push(...baseOptions);

  // Add options increasing by increment until reaching the highest value
  for (let i = increment; i <= highestValue; i += increment) {
    itemsPerPageOptions.push(i);
  }

  // Update local storage when itemsPerPage changes
  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

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

  // Handle load more button click
  const handleLoadMore = () => {
    const totalItems = filteredProducts.length;
    const highestValue = Math.ceil(totalItems / 100) * 100;
    setItemsPerPage(highestValue);
  };

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'modelNumber') {
      return a.modelNumber.localeCompare(b.modelNumber);
    } else if (sortOption === 'unit_cost') {
      return a.unit_cost - b.unit_cost;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  // Handle Product Selection
  const handleProductSelect = (product, isSelected) => {
    if (isSelected) {
      const isAlreadySelected = selectedProducts.some(
        (selectedProduct) => selectedProduct.modelNumber === product.modelNumber
      );

      if (!isAlreadySelected) {
        setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
      }
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((selectedProduct) => selectedProduct.modelNumber !== product.modelNumber)
      );
    }
  };

  // Function to format a number to a specified number of decimal places
  const formatNumber = (number, decimalPlaces) => {
    if (decimalPlaces === 0) {
      return Math.round(number).toFixed(0);
    }
    return number.toFixed(decimalPlaces);
  };

  // Function to export filtered products as XLS
  const exportAsXLS = (exportOption) => {

    // If this flag is '0', then only the shown items will be exported,
    // If '1', then All of the items will be exported.
    // If '2', then the selected items will be exported.
    let filteredData = sortedProducts.slice(startIndex, endIndex);
    if (exportOption == 1) {
      filteredData = sortedProducts.slice(startIndex, filteredProducts.length);
    } else if (exportOption == 2) {
      filteredData = selectedProducts.slice(startIndex, endIndex);
    }

    // Convert the filteredData into the format required by XLSX library
    const xlsData = filteredData.map((product) => ({
      Name: product.name,
      'Model Number': product.modelNumber,
      'Unit Cost': product.unit_cost.toFixed(2),
      'Individual Price': product.price_indv.toFixed(2),
      'Individual Count': formatNumber(product.count_indv, 0),
      'Box Price': product.price_box.toFixed(2),
      'Box Count': formatNumber(product.count_box, 0),
      'Pallet Price': product.price_pallet.toFixed(2),
      'Pallet Count': formatNumber(product.count_pallet, 0),
      'Packaging Type': product.packaging_type,
      Category: product.category,
      Subcategory: product.subCategory,
    }));

    // Create a new workbook and sheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(xlsData);

    // Configure cell number format for Unit Cost, Individual Price, Box Price, Pallet Price
    const cellNumberFormat = { numFmt: '0.00' };
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (worksheet[cellAddress]) {
          if (C === 2 || C === 4 || C === 6 || C === 8) {
            worksheet[cellAddress].z = cellNumberFormat.numFmt;
          }
        }
      }
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Catalog');

    // Generate the XLS file
    const xlsBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Create a Blob from the buffer
    const blob = new Blob([xlsBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the Blob as a file
    saveAs(blob, 'Catalog - Charlotte Imports.xlsx');
  };

  // Function to be called after the export is complete to reset itemsPerPage to its previous value
  const handleExportComplete = () => {
    setItemsPerPage(prevItemsPerPage);
  };

  // Common options for generating the PDF
  const pdfOptions = {
    filename: 'Catalog - Charlotte Imports.pdf',
    image: { type: 'webp', quality: 0.98 },
    html2canvas: { scale: 1, useCORS: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' },
  };

  // Function to export all products as PDF
  const exportAllAsPDF = () => {
    // Store the current itemsPerPage value in the prevItemsPerPage state variable
    setPrevItemsPerPage(itemsPerPage);

    // Set the items shown to the highest value
    setItemsPerPage(highestValue);

    // Set exportAll to true
    setExportAll(true);
  };

  // useEffect hook to trigger the export once the itemsPerPage has been updated
  useEffect(() => {
    if (itemsPerPage === highestValue && exportAll) {
      exportAsPDF();
      handleExportComplete();
    }
    setExportAll(false);
  }, [itemsPerPage]);

  // Function to export currently shown products as PDF
  const exportAsPDF = () => {

    // Hide the checkboxes before generating the PDF
    const checkboxes = document.querySelectorAll('.product-grid input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.style.display = 'none';
    });

    const grid = document.querySelector('.product-grid');

    html2pdf()
      .set({
        margin: [18, 0, 18, 0],
        ...pdfOptions,
      })
      .from(grid)
      .save()
      .then(() => {
        // After generating the PDF, show the checkboxes again
        checkboxes.forEach((checkbox) => {
          checkbox.style.display = 'block';
        });
      })
      .catch((error) => {
        console.error('Failed to generate PDF:', error);
        // Ensure checkboxes are visible again in case of an error
        checkboxes.forEach((checkbox) => {
          checkbox.style.display = 'block';
        });
      });
  };

  // Function to export selected products as PDF
  const exportSelectedAsPDF = async () => {
    const grid = document.querySelector('.selected-product-grid');

    // Create a clone of the grid element
    const clonedGrid = grid.cloneNode(true);

    // Adjust CSS properties of the cloned grid to make it visible
    clonedGrid.style.display = 'flex';

    try {
      await html2pdf()
        .set({
          margin: [18, 20, 18, 0],
          ...pdfOptions,
        })
        .from(clonedGrid)
        .save();
    } catch (error) {
      // Handle error
      console.error('Failed to export PDF:', error);
    } finally {
      // Remove the cloned grid from the document
      document.body.removeChild(clonedGrid);
    }
  };

  // Find all category and subcategories from the item list
  const categoryLinks = allCategories.map((category) => {
    const subcategories = allSubcategories
      .filter((subCategory) => products.some((product) => product.subCategory === subCategory && product.category === category))
      .map((subCategory) => ({ name: subCategory, link: `/products/${category}/${subCategory}` }));

    return {
      name: category,
      link: `/products/${category}`,
      subcategories: subcategories.length > 0 ? subcategories : undefined,
      showSubcategories: categoryState[category] || false
    };
  });

  // Create links for all categories/subcategories
  const generateCategoryLinks = (categories, depth = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category.link}>
        <div className={`category${depth === 0 ? ' main-category' : ' sub-category'}`}>
          <Link to={category.link}>{category.name}</Link>
          {category.subcategories && (
            <button
              className={`subcategories-toggle-button ${category.showSubcategories ? 'open' : ''}`}
              onClick={() => toggleSubcategories(category.name)}
            >
              &#x25BE;
            </button>
          )}
          {category.showSubcategories && category.subcategories && generateCategoryLinks(category.subcategories, depth + 1)}
        </div>
      </React.Fragment>
    ));
  };

  const renderedCategoryLinks = generateCategoryLinks(categoryLinks);

  const startIndex = 0;
  const endIndex = itemsPerPage === 'All' ? sortedProducts.length : startIndex + parseInt(itemsPerPage, 10);

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
          <div className="category main-category">
            <Link to="/">All Products</Link>
          </div>
          <div className="sidebar-heading">
            <h3>Export Shown</h3>
          </div>
          <div className="export-container">
            <div className="export-XLS">
              <button onClick={() => exportAsXLS(0)} className="icon-button">
                <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
              </button>
            </div>
            <div className="export-pdf">
              <button onClick={exportAsPDF} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>
          </div>
          <div className="sidebar-heading">
            <h3>Export All</h3>
          </div>
          <div className="export-container">
            <div className="export-XLS">
              <button onClick={() => exportAsXLS(1)} className="icon-button">
                <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
              </button>
            </div>
            <div className="export-pdf">
              <button onClick={exportAllAsPDF} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>
          </div>
          {selectedProducts.length > 0 && (
            <div className="sidebar-heading">
              <h3>Export Selected</h3>
            </div>
          )}
          {selectedProducts.length > 0 && (
            <div className="export-container">
              <div className="export-XLS">
                <button onClick={() => exportAsXLS(2)} className="icon-button">
                  <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
                </button>
              </div>
              <div className="export-pdf">
                <button onClick={exportSelectedAsPDF} className="icon-button">
                  <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
                </button>
              </div>
            </div>
          )}
          {selectedProducts.length > 0 && (
            <div className="selected-products">
              {selectedProducts.map((product) => (
                <div key={product.modelNumber} className="selected-product">
                  <label>
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => handleProductSelect(product, false)}
                    />
                    {product === 'checkbox' ? (
                      product.name
                    ) : (
                      <Link to={`/products/${product.category}/${product.subCategory}/${product.modelNumber}`}>
                        {product.name}
                      </Link>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="products-wrapper">
        <div className="current-category">
          <h3>
            <Link to="/">Products</Link>
            {category && <span> / </span>}
            {category && subcategory && (
              <span>
                <Link to={`/products/${category}`}>{category}</Link> / {subcategory}
              </span>
            )}
            {category && !subcategory && (
              <span>
                <Link to={`/products/${category}`}>{category}</Link>
              </span>
            )}
          </h3>
        </div>
        <div className="product-grid">
          {sortedProducts.slice(startIndex, endIndex).map((product) => (
            <div key={product.modelNumber} className="product-grid-item">
              <ProductSquare
                product={product}
                images={images}
                isChecked={selectedProducts.some((p) => p.modelNumber === product.modelNumber)}
                handleChange={handleProductSelect}
              />
            </div>
          ))}
        </div>
        {filteredProducts.length > itemsPerPage && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        <div className="selected-product-grid">
          {selectedProducts.map((product) => (
            <div key={product.modelNumber} className="product-grid-item">
              <ProductSquare
                product={product}
                images={images}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
