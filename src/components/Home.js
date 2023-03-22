import React from 'react';
import Catalog from './Catalog';
import Header from './nav/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <Catalog />
    </div>
  );
}