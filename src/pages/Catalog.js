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
  const [showSelected, setShowSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProductsSelected, setAllProductsSelected] = useState({});
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

  // Save selected products to local storage
  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  // Reset the showSelected state whenever selectedProducts change
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setShowSelected(false);
    }
  }, [selectedProducts]);

  // Handle Product Selection
  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const isAlreadySelected = prevSelectedProducts.some(
        (selectedProduct) => selectedProduct.modelNumber === product.modelNumber
      );

      if (!isAlreadySelected) {
        return [...prevSelectedProducts, product];
      } else {
        return prevSelectedProducts.filter((selectedProduct) => selectedProduct.modelNumber !== product.modelNumber);
      }
    });
  };

  // Function to handle "Select All" and "Deselect All" for a category
  const handleSelectAll = (categoryName) => {
    const productsInCategory = filteredProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );

    if (areAllProductsSelected(categoryName)) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter(
          (selectedProduct) => !productsInCategory.some((product) => product.modelNumber === selectedProduct.modelNumber)
        )
      );
      setAllProductsSelected((prev) => ({ ...prev, [categoryName]: false }));
    } else {
      setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, ...productsInCategory]);
      setAllProductsSelected((prev) => ({ ...prev, [categoryName]: true }));
    }
  };

  // Function to check if all products in a category are selected
  const areAllProductsSelected = (categoryName) => {
    const productsToCheck = filteredProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );

    return productsToCheck.every((product) =>
      selectedProducts.some((selectedProduct) => selectedProduct.modelNumber === product.modelNumber)
    );
  };

  // Function to deselect all selected items
  const deselectAllItems = () => {
    setSelectedProducts([]);
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

    /* 
      If this flag is '0', then only the shown items will be exported.
      If '1', then All of the items will be exported.
      If '2', then the selected items will be exported.
    */
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
      'MSRP': product.msrp,
      'Individual Price': product.price_indv,
      'Individual Count': formatNumber(product.count_indv, 0),
      'Box Price': product.price_box,
      'Box Count': formatNumber(product.count_box, 0),
      'Pallet Price': product.price_pallet,
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

  /* 
    Function that handles the items per page when it comes to exporting the entire catalog
    This function changes the items per page and stores the previous items per page
    before the exportAsPDF() function is ran 
  */
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
      exportAsPDF(1);
    }
    setExportAll(false);
  }, [itemsPerPage]);

  // Function to export currently shown products as PDF
  const exportAsPDF = async (exportOption) => {

    // Enable webpage "loading"
    setIsLoading(true);

    // Disable scrolling while loading
    document.body.classList.add('no-scroll');

    if (exportOption !== 2) {
      // Hide the checkboxes before generating the PDF
      const checkboxes = document.querySelectorAll('.product-grid input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = 'none';
      });
    }

    // Get the appropriate grid element based on the exportOption
    const grid = exportOption === 2 ? document.querySelector('.selected-product-grid') : document.querySelector('.product-grid');

    if (exportOption === 2) {
      grid.style.display = 'flex';
    }

    try {

      // Create a new div to hold the grid, header, and footer
      const pdfContent = document.createElement('div');

      // Append the header to the new div
      const header = document.querySelector('.pdf-header-container');
      header.style.display = 'flex';
      pdfContent.appendChild(header.cloneNode(true));

      // Append the grid to the new div
      pdfContent.appendChild(grid.cloneNode(true));

      // Append the footer to the new div
      const footer = document.querySelector('.pdf-footer');
      footer.style.display = 'flex';
      pdfContent.appendChild(footer.cloneNode(true));

      // Generate the PDF
      await html2pdf().set({
        margin: [0, 0, 0, 0],
        filename: 'Catalog - Charlotte Imports.pdf',
        image: { type: 'webp', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css'] },
      }).from(pdfContent).save();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Ensure checkboxes are visible again in case of an error
      const checkboxes = document.querySelectorAll('.product-grid input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = 'block';
      });
    } finally {
      if (exportOption === 1) {
        setItemsPerPage(prevItemsPerPage);
      }
      if (exportOption !== 2) {
        // After generating the PDF, show the checkboxes again
        const checkboxes = document.querySelectorAll('.product-grid input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.style.display = 'block';
        });
      } else {
        grid.style.display = 'none';
      }

      // Hide the PDF footer after the export is complete
      const header = document.querySelector('.pdf-header-container');
      header.style.display = 'none';

      // Hide the PDF footer after the export is complete
      const footer = document.querySelector('.pdf-footer');
      footer.style.display = 'none';

      // Enable scrolling after loading is complete
      document.body.classList.remove('no-scroll');

      // Disable webpage "loading"
      setIsLoading(false);
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

  // Create links for all categories/subcategories and dynamically add "Select All" buttons
  const generateCategoryLinks = (categories, depth = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category.link}>
        <div className={`category${depth === 0 ? ' main-category' : ' sub-category'}`}>
          <Link to={category.link}>{category.name}</Link>
          {depth === 0 && (
            <>
              {category.subcategories && (
                <button
                  className={`sidebar-toggle-button ${category.showSubcategories ? 'open' : ''}`}
                  onClick={() => toggleSubcategories(category.name)}
                >
                  &#x25BE;
                </button>
              )}
              <button
                className="select-deselect-items"
                onClick={() => handleSelectAll(category.name)}
              >
                {allProductsSelected[category.name] ? (
                  <img src="/svg-icons/deselect.svg" alt="Deselect" />
                ) : (
                  <img src="/svg-icons/select.svg" alt="Select" />
                )}
              </button>
            </>
          )}
          {category.showSubcategories && category.subcategories && generateCategoryLinks(category.subcategories, depth + 1)}
        </div>
      </React.Fragment>
    ));
  };

  // Reset the showSelected and allProductsSelected state whenever selectedProducts change
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setShowSelected(false);
      setAllProductsSelected({});
    }
  }, [selectedProducts]);

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
            <Link to="/products">All Products</Link>
          </div>
          <div className="sidebar-heading export-heading">
            <h3>Export Shown</h3>
          </div>
          <div className="export-container">
            <div className="export-XLS">
              <button onClick={() => exportAsXLS(0)} className="icon-button">
                <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
              </button>
            </div>
            <div className="export-pdf">
              <button onClick={() => exportAsPDF(0)} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>
          </div>

          <div>
            {/* 
          
          **The <div> above is only needed to hide this feature**

          <div className="sidebar-heading export-heading">
            <h3>Export All</h3>
          </div>
          <div className="export-container">
            <div className="export-XLS">
              <button onClick={() => exportAsXLS(1)} className="icon-button">
                <img src="/svg-icons/export-icons/xls.svg" alt="XLS Icon" />
              </button>
            </div>
            <div className="export-pdf">
              <button onClick={() => exportAllAsPDF()} className="icon-button">
                <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
              </button>
            </div>
          </div>

          **The <div> below is only needed to hide this feature**

          */}
          </div>
          {selectedProducts.length > 0 && (
            <div className="sidebar-heading export-heading">
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
                <button onClick={() => exportAsPDF(2)} className="icon-button">
                  <img src="/svg-icons/export-icons/pdf.svg" alt="PDF Icon" />
                </button>
              </div>
              <div className="select-deselect-items">
                <button onClick={deselectAllItems}>
                  <img src="/svg-icons/deselect.svg" alt="Deselect" />
                </button>
              </div>
              <button
                className={`sidebar-toggle-button ${showSelected ? 'open' : ''}`}
                onClick={() => setShowSelected(!showSelected)}
              >
                {showSelected ? '' : ''}
                &#x25BE;
              </button>
            </div>
          )}
          {showSelected && selectedProducts.length > 0 && (
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
        <div className="pdf-header-container">
          <div className="pdf-header">
            <Link to={`/`}>
              <img src={process.env.PUBLIC_URL + `/content-images/cimpo_logo_pdf.jpg`} alt="PDF Logo" />
            </Link>
            <div className="contact-info">
              <b><a href="mailto:sales@charlotte-imports.com">sales@charlotte-imports.com</a></b>
              <b><a href="tel:1-800-950-0860">1-800-950-0860</a></b>
            </div>
          </div>
        </div>
        <div className="pdf-footer">
          <p>{new Date().toLocaleDateString()} - Prices are subject to change; final prices may vary</p>
        </div>
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
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
