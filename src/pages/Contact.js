import React, { useEffect } from 'react';
import ContactDetails from '../components/ContactDetails';
import EmailForm from '../components/EmailForm';
import '../assets/styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content-container contact-page-font-size">
        <h1>Contact Us</h1>
        <div className="contact-text">
          <h3>Questions about our products?</h3>
        </div>
        <div className="product-contact">
          <a href="mailto:sales@charlotte-imports.com">sales@charlotte-imports.com</a>
          <a href="tel:1-800-950-0860">1-800-950-0860</a>
        </div>
      </div>
      <EmailForm />
    </div>
  );
}
