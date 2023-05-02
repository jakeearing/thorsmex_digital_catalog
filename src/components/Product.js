import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './nav/Header';
import Catalog from './Catalog';
import Contact from './ContactDetails';
import Footer from './nav/Footer';
import '../style/product.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../public/images/product-images', false, /\.(png|jpe?g|svg)$/));

export default function ProductPage() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const { modelnumber } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    scrollToTop();
    axios.get(`http://localhost:5000/api/products/${modelnumber}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [modelnumber]);


  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleTabClick = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab(null);
    } else {
      setActiveTab(tabName);
    }
  };

  const handleCloseTab = () => {
    setActiveTab(null);
  };

  const { name, price, gtin, pieces, category, sub_category, description, details, specs, height, width, weight, stock } = product;
  const productImage = images[`${modelnumber}.jpg`] || images['notfound.jpg'];

  return (
    <div>
      <Header />
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
              <p><b>Price:</b> ${price}</p>
              <p><b>Pieces:</b> {pieces}</p>
              <p><b>Model Number:</b> {modelnumber}</p>
              <p><b>Category:</b> {category}</p>
              <p><b>Subcategory:</b> {sub_category}</p>
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
        <Catalog />
      </div>
      <Footer />
    </div>
  );
}

