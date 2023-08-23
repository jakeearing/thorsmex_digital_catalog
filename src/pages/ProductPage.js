import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductOptions from '../components/ProductOptions';
import Contact from '../components/ContactDetails';
import '../assets/styles/product.css';

export default function Product({ products, images }) {
  const { category, subCategory, modelnumber } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      const storedProduct = parsedProducts.find(
        (p) => p.modelNumber === modelnumber
      );
      if (storedProduct) {
        setProduct(storedProduct);
        // Exit early if the product is found in the stored data
        return;
      }
    }

    axios
      .get(`http://localhost:5000/api/products/${modelnumber}`)
      .then((res) => {
        setProduct(res.data);
        // Update the locally stored products data
        const storedProducts = localStorage.getItem('products');
        const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
        const updatedProducts = [...parsedProducts, res.data];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [modelnumber]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImageClick = (index) => {
    setIsExpanded(true);
    setExpandedImageIndex(index);
  };

  const handleClick = (event) => {
    // Check if the click event originated from within the overlay image
    if (event.target.classList.contains('overlay')) {
      setIsExpanded(false);
    }
  };

  const handlePrevImage = () => {
    if (isExpanded) {
      setExpandedImageIndex((prevIndex) => {
        const lastIndex = productImages.length - 1;
        return prevIndex === 0 ? lastIndex : prevIndex - 1;
      });
    } else {
      setActiveImageIndex((prevIndex) => {
        const lastIndex = productImages.length - 1;
        return prevIndex === 0 ? lastIndex : prevIndex - 1;
      });
    }
  };

  const handleNextImage = () => {
    if (isExpanded) {
      setExpandedImageIndex((prevIndex) => {
        const lastIndex = productImages.length - 1;
        return prevIndex === lastIndex ? 0 : prevIndex + 1;
      });
    } else {
      setActiveImageIndex((prevIndex) => {
        const lastIndex = productImages.length - 1;
        return prevIndex === lastIndex ? 0 : prevIndex + 1;
      });
    }
  };

  const { name, gtin, description, details, specs, product_sheet, price_indv,
    price_box, price_pallet, unit_cost, msrp, count_indv, count_box, count_pallet, height_indv,
    width_indv, length_indv, weight_indv, height_box, width_box, length_box,
    weight_box, height_pallet, width_pallet, length_pallet, weight_pallet,
    packaging_type, english_packaging, stock } = product || {};

  const folderName = modelnumber.toString();

  // Load all the images inside the model number folder
  const imageContext = require.context(
    '../assets/images/product-images',
    true,
    /\.(png|jpe?g|gif|svg)$/
  );
  const imagePaths = imageContext.keys().filter((key) =>
    key.startsWith(`./${folderName}/`)
  );
  const imageNames = imagePaths.map((path) => path.replace(`./${folderName}/`, ''));

  // Find the index of the image with "main" in its name
  const mainImageIndex = imageNames.findIndex((name) => name.includes('main'));

  // Set the active image index to the main image index if found,
  // otherwise set it to 0 (first image in the list)
  const [activeImageIndex, setActiveImageIndex] = useState(
    mainImageIndex !== -1 ? mainImageIndex : 0
  );

  // Set the product images in the desired order:
  // If main image exists, put it at the beginning of the array
  // followed by the remaining images
  const productImages = [
    ...(mainImageIndex !== -1
      ? [imageContext(imagePaths[mainImageIndex]).default || imageContext(imagePaths[mainImageIndex])]
      : []),
    ...imagePaths
      .filter((_, index) => index !== mainImageIndex)
      .map((path) => imageContext(path).default || imageContext(path))
  ];

  const showPrevImageArrow = productImages.length > 1;
  const showNextImageArrow = productImages.length > 1;

  return (
    <div className="product-page-container" onClick={handleClick}>
      <div className="product">
        <div className="product-image">
          <img src={productImages[activeImageIndex]} alt={name} onClick={() => handleImageClick(activeImageIndex)} />
          {showPrevImageArrow && !isExpanded && (
            <button className="overlay-button prev-button" onClick={handlePrevImage}>
              &#60;
            </button>
          )}
          {showNextImageArrow && !isExpanded && (
            <button className="overlay-button next-button" onClick={handleNextImage}>
              &#62;
            </button>
          )}
        </div>
        {isExpanded && (
          <div className="overlay">
            <div className="overlay-image-container overlay">
              <img src={productImages[expandedImageIndex]} alt={name} className="overlay-image" />
              <button className="overlay-button close-button" onClick={() => setIsExpanded(false)}>
                &#10006;
              </button>
              {showPrevImageArrow && (
                <button className="overlay-button prev-button" onClick={handlePrevImage}>
                  &#60;
                </button>
              )}
              {showNextImageArrow && (
                <button className="overlay-button next-button" onClick={handleNextImage}>
                  &#62;
                </button>
              )}
            </div>
          </div>
        )}

        <div className="product-details-container">
          <div className="product-name">
            <p>{name}</p>
            <p>Model Number: {modelnumber}</p>
          </div>
          <div className="details-contact">
            <div className="product-details">
              {/*
              <p>
                <b>List Price:</b> {price_indv ? `$${Number(price_indv["$numberDecimal"]).toFixed(2)}` : '-'}
              </p>
              */}
              <p>
                <b>List Price:</b> {msrp ? `$${Number(msrp["$numberDecimal"]).toFixed(2)}` : '-'}
              </p>
              <p>
                <b>Quantity:</b> {count_indv ? `${count_indv}` : '-'}
              </p>
              {/*
              <p>
                <b>Unit Cost:</b> {unit_cost ? `$${Number(unit_cost["$numberDecimal"]).toFixed(2)}` : '-'}
              </p>
              */}
              {product_sheet && product_sheet.endsWith('.pdf') ? (
                <p>
                  <a
                    href={require(`../assets/images/product-info-sheets/${product_sheet}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here for product sheet
                  </a>
                </p>
              ) : (
                <p>No Product Sheet Available</p>
              )}
            </div>
            <div className="contact-details">
              <Contact />
            </div>
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="product-secondary-container">
        <div className="item-specs">
          <button
            className={activeTab === 'details' ? 'active' : ''}
            onClick={() => handleTabClick('details')}
          >
            Details
          </button>
          <button
            className={activeTab === 'item-specifications' ? 'active' : ''}
            onClick={() => handleTabClick('item-specifications')}
          >
            Item Specifications
          </button>
          <button
            className={activeTab === 'more-information' ? 'active' : ''}
            onClick={() => handleTabClick('more-information')}
          >
            More Information
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'details' && (
            <ul>
              {details &&
                details.split(';').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
            </ul>
          )}

          {activeTab === 'item-specifications' && (
            <ul>
              {specs &&
                specs.split(';').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
            </ul>
          )}

          {activeTab === 'more-information' && (
            <ul>
              <li>Packaging Type: {packaging_type}</li>
              <li>Box Quantity: {count_box ? `${count_box} pieces` : '-'}</li>
              <li>Pallet Quantity: {count_pallet ? `${count_pallet} pieces` : '-'}</li>
              <li>English Packaging: {english_packaging}</li>
              <li>
                Individual Dimensions: {height_indv ? `${Number(height_indv["$numberDecimal"]).toFixed(2)} x ${Number(width_indv["$numberDecimal"]).toFixed(2)} x ${Number(length_indv["$numberDecimal"]).toFixed(2)} inches` : '-'}
              </li>
              <li>Individual Weight: {weight_indv ? `${Number(weight_indv["$numberDecimal"]).toFixed(2)} pounds` : '-'}</li>
              <li>
                Box Dimensions: {height_box ? `${Number(height_box["$numberDecimal"]).toFixed(2)} x ${Number(width_box["$numberDecimal"]).toFixed(2)} x ${Number(length_box["$numberDecimal"]).toFixed(2)} inches` : '-'}
              </li>
              <li>Box Weight: {weight_box ? `${Number(weight_box["$numberDecimal"]).toFixed(2)} pounds` : '-'}</li>
              <li>
                Pallet Dimensions: {height_pallet ? `${Number(height_pallet["$numberDecimal"]).toFixed(2)} x ${Number(width_pallet["$numberDecimal"]).toFixed(2)} x ${Number(length_pallet["$numberDecimal"]).toFixed(2)} inches` : '-'}
              </li>
              <li>Pallet Weight: {weight_pallet ? `${Number(weight_pallet["$numberDecimal"]).toFixed(2)} pounds` : '-'}</li>
              <li>Barcode Number: {gtin}</li>
            </ul>
          )}
        </div>
        <div className="product-options">
          {product && (
            <ProductOptions
              products={products}
              images={images}
              currentModelNumber={modelnumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}
