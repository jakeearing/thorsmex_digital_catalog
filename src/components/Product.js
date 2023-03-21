import React from 'react';
import { Link } from 'react-router-dom';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const images = importAll(require.context('../../public/images/product-images', false, /\.(png|jpe?g|svg)$/));


function Product(props) {
    const { name, price, gtin, modelnumber, category, sub } = props.product;
    const productImage = images[`${modelnumber}.jpg`];
    return (
        <Link to={{ pathname: `/ProductPage/${modelnumber}`, state: { modelnumber } }}>
      <div className="product-square">
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <p>Price: ${price}</p>
      </div>
    </Link>
    );
  }
  
  export default Product;