import React, { useEffect } from 'react';
import '../assets/styles/about.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content-container">
        <div className="left-column-text">
          <div className="left-column-content">
            <h2>About Us</h2>
            <p><b>THORSMEX, S.A de C.V.</b> is a Mexican company founded in 1996. At THORSMEX, our main purpose is to develop, manufacture, represent and commercialize fixing
              systems, raceway systems and Telecom in the American Continent with presence in Guatemala, Colombia,
              Chile, El Salvador, Bolivia, Panama, Nicaragua, Canada, the United States, among others.</p>
            <p><b>The 5 basic characteristics of Thorsmex products are: </b>
              functionality, aesthetics, safety, durability and quality.</p>
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
            <p>We have the experience to develop the following private label
              services: extrusion, injection moulding, blow moulding and packaging
              processes.</p>
            <p>We are endorsed by national and international organisms,
              confirming excellence through strict testing implemented
              to every product, complying with high performance normativity
              and standards, in order to provide the best solutions in the
              market.</p>
          </div>
        </div>
      </div>
      <div className="about-content-container">
        <div className="left-column-text">
          <div className="left-column-content">
          <h2>Certifications</h2>
            <ul>
              <li>THORSMAN, Sweden ISO 9001:2015 No. IQS/1311/2013, accrediting all products design.</li>
              <li>THORSMEX, S.A. DE C.V. ISO 9001:2015</li>
              <li>SEMKO & NEMKO, Norway and Sweden, for all conduit accessories</li>
              <li>Product certification by the Canadian Standards Association. No 1162395, year 2009</li>
              <li>The conduit systems exceeded the accredited tests with CSA International certification, which regulates products for the Electric Sector and Construction Industry</li>
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