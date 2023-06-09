import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import About from '../pages/About';
import Contact from '../pages/Contact';
import TermsOfUse from '../pages/TermsOfUse';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Product from '../pages/ProductPage';
import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/nav/Header';
import Footer from '../components/nav/Footer';

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
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data));
    }

    const storedProducts = localStorage.getItem("products");
    if (!storedProducts) {
      fetchProducts();
    } else {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/all" replace />}
          />
          <Route path="/:category" element={<Catalog products={products} images={images} />} />
          <Route path="/:category/:subcategory" element={<Catalog products={products} images={images} />} />
          <Route path="/:category/:subcategory/:modelnumber" element={<Product products={products} images={images} />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </ScrollToTop>
      <ScrollToTopOnNavigation />
    </BrowserRouter>
  );
};

export default App;
