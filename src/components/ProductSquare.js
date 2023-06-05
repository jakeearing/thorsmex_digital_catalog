import React from 'react';
import { Link } from 'react-router-dom';

export default function Products({ product, images }) {
  const { name, price_indv, modelNumber, category, subCategory } = product;
  const productImage = images[Object.keys(images).find(key => key.startsWith(modelNumber))] || images['notfound.jpg'];

  return (
    <Link to={{ pathname: `/${category}/${subCategory}/${modelNumber}`, state: { modelNumber } }}>
      <div className="product-square">
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <h5>{modelNumber}</h5>
        <p>Price: ${price_indv}</p>
      </div>
    </Link>
  );
}
