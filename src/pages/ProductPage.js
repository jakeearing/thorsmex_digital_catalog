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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${modelnumber}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [modelnumber]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { name, gtin, description, details, specs, product_sheet, price_indv,
    price_box, price_pallet, unit_cost, count_indv, count_box, count_pallet, height_indv,
    width_indv, length_indv, weight_indv, height_box, width_box, length_box,
    weight_box, height_pallet, width_pallet, length_pallet, weight_pallet, 
    packaging_type, english_packaging, stock } = product || {};

  const productImage =
    images[Object.keys(images).find((key) => key.startsWith(modelnumber))] || images['notfound.jpg'];

  return (
    <div className="product-page-container">
      <div className="product">
        <div className="product-image">
          <img src={productImage} alt={name} />
        </div>
        <div className="product-details-container">
          <div className="product-name">
            <p>{name}</p>
            <p>Model Number: {modelnumber}</p>
          </div>
          <div className="details-contact">
            <div className="product-details">
              <p>
                <b>Individual Price ({count_indv} count):</b> ${price_indv}
              </p>
              <p>
                <b>Box Price ({count_box} pieces):</b> ${price_box}
              </p>
              <p>
                <b>Pallet Price ({count_pallet} boxes):</b> ${price_pallet}
              </p>
              <p>
                <b>Stock (Charlotte):</b> 97
              </p>
              {product_sheet && product_sheet.endsWith(".pdf") ? (
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
              <li>English Packaging: {english_packaging}</li>
              <li>Individual Dimensions: {height_indv} x {width_indv} x {length_indv} inches</li>
              <li>Individual Weight: {weight_indv} pounds</li>
              <li>Box Dimensions: {height_box} x {width_box} x {length_box} inches</li>
              <li>Box Weight: {weight_box} pounds</li>
              <li>Pallet Dimensions: {height_pallet} x {width_pallet} x {length_pallet} inches</li>
              <li>Pallet Weight: {weight_pallet} pounds</li>
              <li>Barcode Number: {gtin}</li>
            </ul>
          )}
        </div>
        <div className="product-options">
          {product && <ProductOptions products={products} images={images} currentModelNumber={modelnumber} />}
        </div>
      </div>
    </div>
  );
}
