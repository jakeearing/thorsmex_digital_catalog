import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './nav/Header';
import products from './ProductModel';
import Catalog from './Catalog';
import Contact from './ContactDetails';
import Footer from './nav/Footer';
import '../style/product.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../public/images/product-images-demo', false, /\.(png|jpe?g|svg)$/));

export default function ProductPage() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const { modelnumber } = useParams();
  const product = products.find(p => p.modelnumber == modelnumber);

  const format_model = modelnumber.slice(0, 4) + '-' + modelnumber.slice(4);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const [activeTab, setActiveTab] = useState(null);

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

  const { name, price, gtin, category, sub, description, details, specifications } = product;
  const productImage = images[`${modelnumber}.jpg`];

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
            <p><b>GTIN:</b> {gtin}</p>
            <p><b>Model Number:</b> {format_model}</p>
            <p><b>Category:</b> {category}</p>
            <p><b>Subcategory:</b> {sub}</p>
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
              {details.split('\n').map((item, index) => (
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
              {specifications.split('\n').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'more-information' && (
        <div>
          <div className="tab-content">
            <p>More information goes here.</p>
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

