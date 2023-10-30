import React from 'react';
import '../assets/styles/volume-discounts.css';

export default function VolumeDiscounts() {
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
              <td>$1 - $50</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>$50 - $500</td>
              <td>12%</td>
            </tr>
            <tr>
              <td>$500 - $1,000</td>
              <td>14%</td>
            </tr>
            <tr>
              <td>$1,000 - $3,000</td>
              <td>16%</td>
            </tr>
            <tr>
              <td>$3,000 - $5,000</td>
              <td>18%</td>
            </tr>
            <tr>
              <td>$5,000 - $7,000</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>$7,000 - $9,000</td>
              <td>23%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
