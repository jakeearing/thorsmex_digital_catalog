import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductOptions from '../components/ProductOptions';
import Contact from '../components/ContactDetails';
import '../assets/styles/product.css';

export default function Product({ products, images, discounts }) {
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
    msrp, count_indv, count_box, count_pallet, height_indv, width_indv,
    length_indv, weight_indv, height_box, width_box, length_box, weight_box,
    height_pallet, width_pallet, length_pallet, weight_pallet, packaging_type,
    english_packaging } = product || {};

  // Create a state variable to track when the price range is clicked
  const [selectedRange, setSelectedRange] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Function to handle the click and toggle the selected price range
  const togglePriceRange = (range) => {
    if (selectedRange === range) {
      setSelectedRange(null);
    } else {
      setSelectedRange(range);
    }
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

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
              {/* <p>
                <b>Wholesale Price:</b> {price_indv ? `$${price_indv}` : '-'}
              </p>
               */
                <p>
                  <b>List Price:</b> {msrp ? `$${msrp}` : '-'}
                </p>}
              <p>
                <b>Units:</b> {count_indv ? `${count_indv}` : '-'}
              </p>
              {/*
              <p>
                <b>Unit Cost:</b> {unit_cost ? `$${unit_cost}` : '-'}
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
              {/* <p className="link-container">
                <b onClick={() => {
                  togglePriceRange('Price Discounts by Volume');
                  toggleDropDown();
                }}>
                  {isDropDownOpen ? 'Discounts based on purchase volume' : 'Click to view discounts by volume'}
                </b>
              </p> */}
              {selectedRange === 'Price Discounts by Volume' && (
                <div className="indent">
                  {discounts.map((priceItem) => (
                    <p key={priceItem.range}>
                      <b>{priceItem.range}:</b> {priceItem.Discount}
                    </p>
                  ))}
                </div>
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
                details.split('|').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
            </ul>
          )}

          {activeTab === 'item-specifications' && (
            <ul>
              {specs &&
                specs.split('|').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
            </ul>
          )}

          {activeTab === 'more-information' && (
            <ul>
              {<li>Box List Price: ${(msrp * count_box).toFixed(2)}</li>}
              <li>Box Unit Count: {`${count_box * count_indv} pieces`}</li>
              {<li>Pallet List Price: ${(msrp * count_box * count_pallet).toFixed(2)}</li>}
              <li>Pallet Unit Count: {`${count_pallet * count_box * count_indv} pieces`}</li>
              <li>Packaging Type: {packaging_type}</li>
              <li>English Packaging: {english_packaging}</li>
              <li>
                Product Packaging Dimensions: {height_indv ? `${height_indv} x ${width_indv} x ${length_indv} inches` : '-'}
              </li>
              <li>Product Weight: {weight_indv ? `${weight_indv} pounds` : '-'}</li>
              <li>
                Box Dimensions: {height_box ? `${height_box} x ${width_box} x ${length_box} inches` : '-'}
              </li>
              <li>Box Weight: {weight_box ? `${weight_box} pounds` : '-'}</li>
              <li>
                Pallet Dimensions: {height_pallet ? `${height_pallet} x ${width_pallet} x ${length_pallet} inches` : '-'}
              </li>
              <li>Pallet Weight: {weight_pallet ? `${weight_pallet} pounds` : '-'}</li>
              {<li>Barcode Number: {gtin}</li>}
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
