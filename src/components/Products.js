import React from 'react';
import { Link } from 'react-router-dom';

export default function Products({ product, images }) {
  const { name, price, modelNumber, category, subCategory } = product;

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
