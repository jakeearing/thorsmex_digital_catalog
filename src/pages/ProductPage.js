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

  const { name, price_indv, gtin, count_indv, description, details, specs, 
    product_sheet, height_indv, width_indv, weight_indv, height_box, width_box, weight_box, height_pallet, width_pallet, weight_pallet, stock } =
    product || {};

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
          </div>
          <div className="details-contact">
            <div className="product-details">
              <p>
                <b>Price:</b> ${price_indv}
              </p>
              <p>
                <b>Pieces:</b> {count_indv}
              </p>
              <p>
                <b>Model Number:</b> {modelnumber}
              </p>
              <p>
                <b>Stock:</b> 97
              </p>
              <p>
                <b>Information:</b> {product_sheet}
              </p>
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
            <li>Individual Height: {height_indv} inches</li>
            <li>Individual Width: {width_indv} inches</li>
            <li>Individual Weight: {weight_indv} pounds</li>
            <li>Box Height: {height_box} inches</li>
            <li>Box Width: {width_box} inches</li>
            <li>Box Weight: {weight_box} pounds</li>
            <li>Pallet Height: {height_pallet} inches</li>
            <li>Pallet Width: {width_pallet} inches</li>
            <li>Pallet Weight: {weight_pallet} pounds</li>
            <li>Barcode Number: {gtin}</li>
          </ul>
        )}
      </div>

      <div className="product-options">
        {product && <ProductOptions products={products} images={images} currentModelNumber={modelnumber} />}
      </div>
    </div>
  );
}
