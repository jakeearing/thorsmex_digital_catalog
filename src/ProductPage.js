import React from 'react';
import { useParams } from 'react-router-dom'
import products from './products';
import Catalog from './catalog';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function ProductPage() {
    
    const { modelnumber } = useParams();
    const product = products.find(p => p.modelnumber == modelnumber);
  
    if (!product) {
      return <div>Product not found.</div>;
    }
  
    const { name, price, gtin, category, sub } = product;
    const productImage = images[`${modelnumber}.jpg`];
  
    return (
    <div>
      <div className="product-page">
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <div className="product-details">
            <p>Price: ${price}</p>
            <p>GTIN: {gtin}</p>
            <p>Model Number: {modelnumber}</p>
            <p>Category: {category}</p>
            <p>Subcategory: {sub}</p>
        </div>
        <div className="product-contact">
            <h2>Contact to Purchase:</h2>
            <a href="mailto:sales@charlotte-imports.com">sales@charlotte-imports.com</a>
            <a href="tel:1-800-950-0860">1-800-950-0860</a>
        </div>
        </div>
    
        <Catalog />
    </div> 
    );
  }

export default ProductPage;
