import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Products({ product, images, onSelectionChange }) {
  const { name, price, modelNumber, category, subCategory } = product;
  const productImage = images[Object.keys(images).find((key) => key.startsWith(modelNumber))] || images['notfound.jpg'];

  const [selected, setSelected] = useState(false);

  const handleCheckboxChange = () => {
    const updatedSelected = !selected;
    setSelected(updatedSelected);
    onSelectionChange(product, updatedSelected);
  };

  return (
    <div className="product-square">
      <input type="checkbox" checked={selected} onChange={handleCheckboxChange} />
      <Link
        to={{ pathname: `/${category}/${subCategory}/${modelNumber}`, state: { modelNumber } }}
        onClick={(e) => {
          if (selected) {
            e.preventDefault();
          }
        }}
      >
        <img src={productImage} alt={name} />
        <h2>{name}</h2>
        <h5>{modelNumber}</h5>
        <p>Price: ${price}</p>
      </Link>
    </div>
  );
}
