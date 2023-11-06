import React from 'react';
import ContactDetails from '../components/ContactDetails';
import EmailForm from '../components/EmailForm';
import '../assets/styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content-container contact-page-font-size">
        <h1>Contact Us</h1>
        <div className="contact-text">
          <h3>For any inquiries about our products in English or Spanish, let us know by
            submitting your information below! Our committed team will reach out to you
            within 24 hours!</h3>
        </div>
        <div className="product-contact">
          <h3>
            Or reach us directly at:
          </h3>
          <a href="mailto:sales@charlotte-imports.com">sales@charlotte-imports.com</a>
          <a href="tel:1-800-950-0860">1-800-950-0860</a>
        </div>
      </div>
      <EmailForm />
    </div>
  );
}
