import React from 'react';
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

  const { name, price, gtin, category, sub, description } = product;
  const productImage = images[`${modelnumber}.jpg`];

  return (
    <div>
      <Header />
      <div className="product-page">
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
      <Contact />
      <Catalog />
    </div>
  );
}

export default ProductPage;
