import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimilarProducts from '../components/SimilarProducts';
import ProductOptions from '../components/ProductOptions';
import Contact from '../components/ContactDetails';
import Error from '../components/Error';
import '../assets/styles/product.css';

export default function Product({ products, images }) {
  const { category, subCategory, modelnumber } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${modelnumber}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [modelnumber]);

  const handleTabClick = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab(null);
    } else {
      setActiveTab(tabName);
    }
  };

  const { name, price_indv, gtin, count_indv, description, details, specs, product_sheet, height, width, weight, stock } = product || {};
  
  const productImage = images[Object.keys(images).find(key => key.startsWith(modelnumber))] || images['notfound.jpg'];

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
              <p><b>Price:</b> ${price_indv}</p>
              <p><b>Pieces:</b> {count_indv}</p>
              <p><b>Model Number:</b> {modelnumber}</p>
              <p><b>Stock:</b> 97</p>
              <p><b>Information:</b> {product_sheet}</p>
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
        <button className={activeTab === 'details' ? 'active' : ''} onClick={() => handleTabClick('details')}>Details</button>
        <button className={activeTab === 'item-specifications' ? 'active' : ''} onClick={() => handleTabClick('item-specifications')}>Item Specifications</button>
        <button className={activeTab === 'more-information' ? 'active' : ''} onClick={() => handleTabClick('more-information')}>More Information</button>
      </div>

      {activeTab === 'details' && (
        <div>
          <div className="tab-content">
            <ul>
              {details.split(';').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'item-specifications' && (
        <div>
          <div className="tab-content">
            <ul>
              {specs.split(';').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'more-information' && (
        <div>
          <div className="tab-content">
            <ul>
              <li>Height: {height} inches</li>
              <li>Width: {width} inches</li>
              <li>Weight: {weight} pounds</li>
              <li>Barcode Number: {gtin}</li>
            </ul>
          </div>
        </div>
      )}
      <div className="catalog-margin">
      {product && <ProductOptions products={products} images={images} currentModelNumber={modelnumber} />}
      </div>
    </div>
  );
}

