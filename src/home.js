import React, { useState } from 'react';
import Product from './Product';
import products from './products';
import Catalog from './catalog';
import './catalog.css';

export default function home() {
  return (
    <div>
      <div className="title">
        <h1>Charlotte Imports</h1>
        <p>Importer and distributor of Thorsmex products in the US. </p>
      </div>
      <Catalog />
    </div>
  );
}