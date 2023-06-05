import React from 'react';
import Products from './ProductSquareSmall';

function ProductOptions({ products, images, currentModelNumber }) {
  const filteredProducts = products.filter(product => {
    const currentProductPrefix = currentModelNumber.substring(0, 4);
    const productPrefix = product.modelNumber.substring(0, 4);
    return currentProductPrefix === productPrefix;
  });

  return (
    <div>
        <h3>More Options</h3>
      <div className="product-grid-small">
        {filteredProducts.map(product => (
          <div key={product.modelNumber} className={`product-grid-small-item ${product.modelNumber === currentModelNumber ? 'highlighted' : ''}`}>
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductOptions;
