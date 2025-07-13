import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <section className="home-section video-hero">
        <video autoPlay muted loop className="background-video">
          <source src="/content-images/home/background_video.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay-content">
          <h1>Built for Performance.<br />Trusted for Generations.</h1>
          <p>
            Welcome to THORSMEX, S.A. DE.C.V., an industry traiblazer since or
            establishment in 1996. At THORSMEX, our dedication is clear: to craft,
            represent, and deliver exceptionall fastening systems, raceeway
            solutions, and cutting-edge Telecom products a cross the Americas.
          </p>
          <p>
            From Guatemaa to United States and beyond, our presence spans a
            myriad of countries, empowering industries throughout Colombia,
            Chile, el Salvador, bolivia, Panama, Nicaragua and Canada.
          </p>
          <a href="/catalog" className="catalog-button">View Catalog</a>
        </div>
      </section>

      <section className="home-section products-section">
        <h2>Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="electrical.png" alt="Electrical Hardware" />
            <p>Electrical Hardware</p>
          </div>
          <div className="product-card">
            <img src="telecom.png" alt="Telecom" />
            <p>Telecom</p>
          </div>
          <div className="product-card">
            <img src="discounts.png" alt="Volume Discounts" />
            <p>Volume Discounts</p>
          </div>
          <div className="product-card">
            <img src="retail.png" alt="Retail & Online" />
            <p>Retail & Online Stores</p>
          </div>
        </div>
      </section>

      <section className="home-section business-section">
        <div className="logo-overlay">
          <img src="thorsmexusa_logo.png" alt="Thorsmex USA Logo" />
        </div>
        <div className="overlay-content light-text">
          <h2>Built for Performance. Trusted for Generations.</h2>
          <p>
            Our presence spans countries from Guatemala to Canada, empowering industries across the continent.
          </p>
        </div>
      </section>

      <section className="home-section testimonial-section">
        <div className="testimonial-image">
          <img src="movers.jpg" alt="Movers" />
        </div>
        <div className="testimonial-content">
          <h2>Client Testimonials</h2>
          <div className="quote">
            <p>“Thorsmex products have consistently exceeded our expectations. Their quality and durability are unmatched in the industry.”</p>
            <span>– Carlos M., Electrical Engineer</span>
          </div>
          <div className="quote">
            <p>“We’ve relied on Thorsmex for over a decade. Their commitment to innovation and compliance makes them our top choice.”</p>
            <span>– Lucía R., Infrastructure Project Manager</span>
          </div>
          <div className="quote">
            <p>“Working with Thorsmex has always been smooth and efficient. Their customer service and technical support are outstanding.”</p>
            <span>– José L., Telecom Systems Integrator</span>
          </div>
        </div>
      </section>
    </div>
  );
}
