import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Retail from '../pages/Retail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import TermsOfUse from '../pages/TermsOfUse';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Product from '../pages/ProductPage';
import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Error from '../pages/Error';
import discounts from '../assets/promos/discounts.json';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images/product-images', true, /\.(png|jpe?g|svg)$/));

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
      try {
        const apiUrl = process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_API_URL_DEV
          : process.env.REACT_APP_API_URL_PROD;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const storedProducts = localStorage.getItem("products");
        if (!storedProducts || JSON.stringify(data) !== storedProducts) {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        } else {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
        }
      } catch (error) {
        // An error occurred while fetching data
        console.error("Error fetching products:", error);

        // Fallback to the data stored in local storage
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
        }
      }
    }
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Header />
        <Routes>
          {
          <Route path="/" element={<Home />} /> 
          }
          <Route
            path="/products"
            element={<Navigate to="/products/all" replace />}
          />
          <Route path="/products/:category" element={<Catalog products={products} images={images} />} />
          <Route path="/products/:category/:subcategory" element={<Catalog products={products} images={images} />} />
          <Route path="/products/:category/:subcategory/:modelnumber" element={<Product products={products} images={images} discounts={discounts} />} />
          <Route path="/retail" element={<Retail/>} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/product-not-found" element={<Error errorMessage={"Product Not Found"} />} />
          <Route
            path="*"
            element={<Navigate to="/page-not-found" replace />}
          />
          <Route path="/page-not-found" element={<Error errorMessage="Page Not Found" />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </ScrollToTop>
      <ScrollToTopOnNavigation />
    </BrowserRouter>
  );
};

export default App;
