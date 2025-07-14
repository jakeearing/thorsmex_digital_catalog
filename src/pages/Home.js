import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/home.css';
import ProductOverview from '../components/ProductOverview';

export default function Home() {
  return (
    <div className="home-wrapper">
      <section className="home-section video-hero">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/content-images/home/background_video.mov" type="video/mp4" />
        </video>
        <div className="video-overlay-filter" />
        <div className="video-overlay-content">
          <h1>Built for Performance.<br />Trusted for Generations</h1>
          <p>
            Welcome to <strong>THORSMEX, S.A. DE C.V.</strong>, an industry trailblazer since our establishment in 1996. At THORSMEX, our dedication is clear: to craft, represent, and deliver exceptional fastening systems, raceway solutions, and cutting-edge Telecom products across the Americas.
          </p>
          <p>
            From Guatemala to United States and beyond, our presence spans a myriad of countries, empowering industries throughout Colombia, Chile, El Salvador, Bolivia, Panama, Nicaragua and Canada.
          </p>
          <Link to="/products" className="catalog-button catalog-button-mockup">
            CATALOG
          </Link>
        </div>
      </section>

      <ProductOverview/>
      
      <section className="home-section about-hero">
        <div className="logo-overlay">
          <img src="/content-images/logos/thorsman-logo.png" alt="Thorsmex USA Logo" />
        </div>
        <div className="overlay-content light-text">
          <p>
            Our range of products is more than just an assemblage; it’s a testament to our commitment to excellence. Every THORSMEX product encapsulates the essence of five core values: <strong>functionality, aesthetics, safety, durability</strong> and <strong>unparalleled quality</strong>.
          </p>
          <p>
            Discover how our innovative solutions redefine standards and empower businesses across the Americas. Join us in elevating your projects with our trusted and high-performance product line!
          </p>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-header">
          CLIENT TESTIMONIALS
        </div>
        <div className="testimonial-flex-row">
          <div className="testimonial-image">
            <img src="/content-images/home/movers.jpg" alt="Client Testimonials" />
          </div>
          <div className="testimonial-content">
            <div className="quote">
              <img
                src="/content-images/icons/testimonial_quotation.png"
                alt="Quotation mark"
                className="testimonial-quote-icon"
              />
              <p>
                Thorsmex products have consistently exceeded our expectations. Their quality and durability are unmatched in the industry.
              </p>
              <span>Carlos M., Electrical Engineer</span>
            </div>
            <div className="quote">
              <img
                src="/content-images/icons/testimonial_quotation.png"
                alt="Quotation mark"
                className="testimonial-quote-icon"
              />
              <p>
                We’ve relied on Thorsmex for over a decade. Their commitment to innovation and compliance makes them our top choice for fasteners and fitting solutions.
              </p>
              <span>Luis R., Infrastructure Project Manager</span>
            </div>
            <div className="quote">
              <img
                src="/content-images/icons/testimonial_quotation.png"
                alt="Quotation mark"
                className="testimonial-quote-icon"
              />
              <p>
                Working with Thorsmex has always been smooth and efficient. Their customer service and technical support are outstanding.
              </p>
              <span>Jose L., Telecom Systems Integrator</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
