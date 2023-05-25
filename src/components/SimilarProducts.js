import React from 'react';
import Products from './Products';
import '../assets/styles/catalog.css';

function SimilarProducts({ products, images, currentProduct }) {
  const filteredProducts = products.filter(product => {
    const modelNumberDiff = Math.abs(
      parseInt(product.modelNumber.replace('-', '')) - 
      parseInt(currentProduct.modelNumber.replace('-', ''))
    );
    return modelNumberDiff <= 5000;
  });

  return (
    <div>
      <h2 className="similar">Similar Products</h2>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.modelNumber} className="product-grid-item">
            <Products product={product} images={images} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;
