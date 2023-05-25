import React, { useEffect } from 'react';
import Catalog from './Catalog';
import Header from '../components/nav/Header';
import Footer from '../components/nav/Footer';

export default function Home({ products, images }) {
  return (
    <div>
      <Catalog products={products} images={images} />
    </div>
  );
}
