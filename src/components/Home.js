import React, { useEffect } from 'react';
import Catalog from './Catalog';
import Header from './nav/Header';
import Footer from './nav/Footer';

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}
