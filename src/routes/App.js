import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/ProductPage';
import ScrollToTop from '../components/ScrollToTop';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images/product-images', false, /\.(png|jpe?g|svg)$/));

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <img
      className={`scroll-to-top-button ${isVisible ? 'show' : ''}`}
      src={process.env.PUBLIC_URL + "/svg-icons/up-arrow.svg"}
      alt="Scroll to Top"
      onClick={scrollToTop}
    />
  );
};

const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      fetch("http://localhost:5000/api/import");
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home products={products} images={images} />} />
          <Route path="/products/:modelnumber" element={<Product products={products} images={images} />} />
        </Routes>
        <ScrollToTopButton />
      </ScrollToTop>
      <ScrollToTopOnNavigation />
    </BrowserRouter>
  );
};

export default App;
