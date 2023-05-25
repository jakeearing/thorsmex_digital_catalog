import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;