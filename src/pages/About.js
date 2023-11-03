import React, { useEffect } from 'react';
import '../assets/styles/about.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content-container">
        <div className="left-column-text">
          <div className="left-column-content">
            <h2>About Us</h2>
            <p>Welcome to <b>THORSMEX, S.A. de C.V.</b>, an industry trailblazer since our establishment in 1996. At THORSMEX, our dedication is clear: to craft, represent, and deliver exceptional fastening systems, raceway solutions, and cutting-edge Telecom products across the Americas.</p>
            <p>From Guatemala to the United States and beyond, our presence spans a myriad of countries, empowering industries throughout Colombia, Chile, El Salvador, Bolivia, Panama, Nicaragua, and Canada.</p>
            <p>Our range of products is more than just an assemblage; it's a testament of our commitment to excellence. Every THORSMEX product encapsulates the essence of five core values: <b>functionality, aesthetics, safety, durability, and unparalleled quality.</b></p>
            <p>Discover how our innovative solutions redefine standards and empower businesses across the Americas. Join us in elevating your projects with our trusted and high-performance product line!</p>
          </div>
        </div>
        <div className="right-column-image">
          <img src={process.env.PUBLIC_URL + `/content-images/plant1.jpg`} alt="Plant" />
        </div>
      </div>
      <div className="about-content-container">
        <div className="left-column-image">
          <img src={process.env.PUBLIC_URL + `/content-images/plant2.png`} alt="Plant" />
        </div>
        <div className="right-column-text">
          <div className="right-column-content">
            <h2>Processes</h2>
            <p>Leveraging our expertise in precision and innovation, we specialize in providing distinguished private label services, that encompass a range of exceptional manufacturing processes. With expertise in extrusion, injection molding, blow molding, and meticulous packaging methods.  </p>
            <p>Endorsed by national and international certifying bodies, we guarantee excellence by subjecting each product to rigorous testing. Our commitment to meeting high-performance standards ensures the delivery of top-notch solutions in the market.</p>
          </div>
        </div>
      </div>
      <div className="about-content-container">
        <div className="left-column-text">
          <div className="left-column-content">
            <h2>Certifications</h2>
            <ul>
              <li>THORSMAN, Sweden ISO 9001:2015 No. IQS/1311/2013, accrediting all product design</li>
              <li>THORSMEX, S.A. DE C.V. ISO 9001:2015</li>
              <li>SEMKO & NEMKO, Norway and Sweden, for all conduit accessories</li>
              <li>Product certification by the Canadian Standards Association. No 1162395, year 2009</li>
              <li>The conduit systems have surpassed accredited tests with CSA international certification ensuring compliance with regulation for the Electrical Sector and Construction Industry</li>
            </ul>
          </div>
        </div>
        <div className="right-column-image">
          <img src={process.env.PUBLIC_URL + `/content-images/plant3.png`} alt="Plant" />
        </div>
      </div>
    </div>
  );
}