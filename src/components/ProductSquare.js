import React from 'react';
import { Link } from 'react-router-dom';

export default function Products({ product, images }) {
  const { name, unit_cost, modelNumber, category, subCategory } = product;

  // Look for the product image that has "main" in the name and load it as the product's image
  // If it is not found, load the first image with the model number that is found
  // If that is not found either, simply load the notfound.jpg
  const productImage =
    images[
    Object.keys(images).find(key => key.includes('main') && key.startsWith(modelNumber)) ||
    Object.keys(images).find(key => key.startsWith(modelNumber))
    ] || images['notfound.jpg'];

  return (
    <Link to={{ pathname: `/${category}/${subCategory}/${modelNumber}`, state: { modelNumber } }}>
      <div className="product-square">
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <h5>{modelNumber}</h5>
        <p>
          <b>Unit Cost:</b> {unit_cost !== undefined ? `$${unit_cost.toFixed(2)}` : '-'}
        </p>
      </div>
    </Link>
  );
}
