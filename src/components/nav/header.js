import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logos/thorsmex-logo.png';
import '../../assets/styles/header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSplashPage, setIsSplashPage] = useState(true);
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
    setIsSplashPage(
      location.pathname === '/' ||
      location.pathname === '/category/all' ||
      location.pathname === '/about-us' ||
      location.pathname === '/contact-us'
    );
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header solid">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Thorsmex Logo" />
          </Link>
        </div>
        {isMobile && (
          <>
            <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} title="Toggle Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={isMenuOpen ? 'open' : ''}>
              <ul>
                <li>
                  <Link to="/all" className={isSplashPage ? 'active' : ''}>
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className={!isSplashPage ? 'active' : ''}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className={!isSplashPage ? 'active' : ''}>
                    Contact
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
                <Link to="/all" className={isSplashPage ? 'active' : ''}>
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/about-us" className={!isSplashPage ? 'active' : ''}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className={!isSplashPage ? 'active' : ''}>
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
