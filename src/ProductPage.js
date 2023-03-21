import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/nav/header';
import products from './products';
import Catalog from './catalog';
import Contact from './contactdetails';
import './productpage.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function ProductPage() {
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
          <div className="product-details">
            <p>Price: ${price}</p>
            <p>GTIN: {gtin}</p>
            <p>Model Number: {format_model}</p>
            <p>Category: {category}</p>
            <p>Subcategory: {sub}</p>
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

      <Contact />
      <Catalog />
    </div>
  );
}

export default ProductPage;
