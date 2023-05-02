import React from 'react';
import { Link } from 'react-router-dom';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../public/images/product-images', false, /\.(png|jpe?g|svg)$/));

export default function Products(props) {
  const { name, price, modelNumber, category, subCategory } = props.product;

  const productImage = images[Object.keys(images).find(key => key.startsWith(modelNumber))] || images['notfound.jpg'];

  return (
    <Link to={{ pathname: `/products/${modelNumber}`, state: { modelNumber } }}>
      <div className="product-square">
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <p>Price: ${price}</p>
      </div>
    </Link>
  );
}
