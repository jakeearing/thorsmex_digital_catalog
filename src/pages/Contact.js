import React, { useEffect } from 'react';
import ContactDetails from '../components/ContactDetails';
import '../assets/styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content-container">
        <h2>Contact Us</h2>
        <div className="contact-text">
          <h3>Questions about our products or anything else? Contact us by Email or
            Phone to get in touch today!</h3>
        </div>
        <ContactDetails />
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
