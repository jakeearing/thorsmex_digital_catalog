import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductSquare({ product, images, isChecked, handleChange = [] }) {
  const { name, price_indv, msrp, modelNumber, category, subCategory } = product;

  // Look for the product image that has "main" in the name and load it as the product's image
  // If it is not found, load the first image with the model number that is found
  // If that is not found either, simply load the notfound.jpg
  const productImage =
    images[
    Object.keys(images).find((key) => key.includes('main') && key.startsWith(modelNumber)) ||
    Object.keys(images).find((key) => key.startsWith(modelNumber))
    ] || images['notfound.jpg'];

  return (
    <div className="product-square">
      <Link to={{ pathname: `/products/${category}/${subCategory}/${modelNumber}`, state: { modelNumber } }}>
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <p>{modelNumber}</p>
        {/* {
          <p>
            <b>List Price:</b> ${Number(price_indv["$numberDecimal"]).toFixed(2)}
          </p>
        }
        {/*
        <p>
          <b>List Price:</b> ${Number(msrp["$numberDecimal"]).toFixed(2)}
        </p> */}
        <p>
          <b>Price available upon request</b>
        </p>
        */}
      </Link>
      <input
        type="checkbox"
        name="select-item"
        onChange={() => handleChange(product, !isChecked)}
        checked={isChecked}
      />
    </div>
  );
}
