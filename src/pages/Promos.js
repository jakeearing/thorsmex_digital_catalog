import React from 'react';
import '../assets/styles/promotions.css';
import VolumeDiscounts from '../components/VolumeDiscounts';
import flyer1 from '../assets/images/promos/FLYER GRAPAS CABLE PLANO.pdf';
import flyer2 from '../assets/images/promos/FLYER GRAPAS CABLE REDONDO.pdf';
import flyer3 from '../assets/images/promos/FLYER GRAPAS.pdf';
import flyer4 from '../assets/images/promos/FLYER.pdf';

export default function Promos() {
    return (
        <div className="promotions-container">
            <div className="promotions-content">
                <div className="promotions-text-main">
                    <p>We offer discounts based on total amount spent for every order!</p>
                    <p>Note: One discount per order, discounts can not be stacked with per-item volume based discounts or any other discounts</p>
                </div>
                <VolumeDiscounts />
                <div className="promotions-text">
                    <p>More Promotions</p>
                </div>
                <div className="promotions-links">
                    <div>
                        <a href={flyer1} target="_blank" rel="noopener noreferrer" className="pdf-link" title="Promo Flyer 1">
                            Flat Cable Cable Staples Promotion
                        </a>
                    </div>
                    <div>
                        <a href={flyer2} target="_blank" rel="noopener noreferrer" className="pdf-link" title="Promo Flyer 2">
                            Round Cable Cable Staples Promotion
                        </a>
                    </div>
                    <div>
                        <a href={flyer3} target="_blank" rel="noopener noreferrer" className="pdf-link" title="Promo Flyer 3">
                            Cable Clips Promotion
                        </a>
                    </div>
                    <div>
                        <a href={flyer4} target="_blank" rel="noopener noreferrer" className="pdf-link" title="Promo Flyer 4">
                            Fixing Kit Dry Wall Anchor Promotion
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
