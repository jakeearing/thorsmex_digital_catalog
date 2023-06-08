import React, { useEffect } from 'react';
import ContactDetails from '../components/ContactDetails';
import '../assets/styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content-container">
        <h2>Contact us today!</h2>
        <ContactDetails />
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h2>Hours</h2>
        <ul>
          <li>Monday: 9:00 am - 5:00 pm</li>
          <li>Tuesday: 9:00 am - 5:00 pm</li>
          <li>Wednesday: 9:00 am - 5:00 pm</li>
          <li>Thursday: 9:00 am - 5:00 pm</li>
          <li>Friday: 9:00 am - 5:00 pm</li>
          <li>Saturday: Closed</li>
          <li>Sunday: Closed</li>
        </ul>
      </div>
    </div>
  );
}
