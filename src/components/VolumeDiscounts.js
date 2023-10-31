import React from 'react';
import '../assets/styles/volume-discounts.css';

export default function VolumeDiscounts({ discounts }) {
  return (
    <div className="volume-discount-container">
      <div className="volume-discount-table">
        <table>
          <thead>
            <tr>
              <th>Order Amount (USD)</th>
              <th>Discount Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{discounts[0].range}</td>
              <td>{discounts[0].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[1].range}</td>
              <td>{discounts[1].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[2].range}</td>
              <td>{discounts[2].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[3].range}</td>
              <td>{discounts[3].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[4].range}</td>
              <td>{discounts[4].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[5].range}</td>
              <td>{discounts[5].Discount}</td>
            </tr>
            <tr>
              <td>{discounts[6].range}</td>
              <td>{discounts[6].Discount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
