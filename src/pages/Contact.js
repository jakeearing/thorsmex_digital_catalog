import React from 'react';
import '../assets/styles/contact.css';
import buildingImg1 from "../assets/images/contact/contact_building_1.jpg";
import buildingImg2 from "../assets/images/contact/contact_building_2.jpg";

export default function ContactPage() {
  return (
    <div className="contact-locations-section">
      <h2 className="contact-locations-title">THORSMEX LOCATIONS</h2>
      <div className="contact-grid-container">
        <div className="contact-location-card">
          <img src={buildingImg1} alt="Thorsmex Building 1" />
          <p>
            PERIFERICO BLVD.<br />
            MANUEL ÁVILA CAMACHO 2900-701,<br />
            HAB. LOS PIRULES, C.P.<br />
            54040, TLALNEPANTLA,<br />
            MEXICO
          </p>
        </div>
        <div className="contact-location-card">
          <img src={buildingImg2} alt="Thorsmex Building 2" />
          <p>
            MANZANA 24 LOTE 9B,<br />
            PARQUE INDUSTRIAL<br />
            ATLACOMULCO, C.P.<br />
            50450 ATLACOMULCO,<br />
            MEXICO
          </p>
        </div>
      </div>
    </div>
  );
}
