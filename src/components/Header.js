import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logos/thorsman-logo.png';
import '../assets/styles/header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Thorsmex Logo" />
          </Link>
        </div>
        {isMobile && (
          <>
            <button className="menu-icon-wrapper" onClick={toggleMenu} title="Toggle Menu">
              <img src={process.env.PUBLIC_URL + "/svg-icons/menu-icon.svg"} className="menu-icon" alt="Menu Icon" />
            </button>
            <nav className={isMenuOpen ? 'open' : ''}>
              <ul>
                <li>
                  <Link to="/" className='active'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className='active'>
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/promotions">
                    Promos
                  </Link>
                </li>
                <li>
                  <Link to="/about-us">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
        {!isMobile && (
          <nav>
            <ul>
              <li>
                <Link to="/" className='active'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/promotions">
                  Promos
                </Link>
              </li>
              <li>
                <Link to="/about-us">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
