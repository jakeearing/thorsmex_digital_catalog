import React from 'react';
import Catalog from './components/Catalog';
import Header from './components/nav/Header';

export default function home() {
  return (
    <div>
      <Header />
      <Catalog />
    </div>
  );
}