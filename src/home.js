import React, { useState } from 'react';
import Catalog from './catalog';
import Header from './components/nav/header';
import './catalog.css';

export default function home() {
  return (
    <div>
      <Header />
      <Catalog />
    </div>
  );
}