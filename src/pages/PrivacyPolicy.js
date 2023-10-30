import React, { useEffect } from 'react';
import '../assets/styles/terms-privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="terms-privacy-container">
      <div className="terms-privacy-content">
        <h1>Privacy Policy</h1>
        <ol>
          <li>
            <h2>Collection and Use of Personal Information</h2>
            <p>
              The website may collect personal information such as name, email address, phone number, and shipping address for
              the purpose of creating and managing user accounts, processing transactions, and providing customer support. We may
              also collect non-personal information, such as IP addresses and browser information, to analyze website usage and improve our services.
            </p>
          </li>
          <li>
            <h2>Security Measures</h2>
            <p>
              The website employs industry-standard security measures to protect against unauthorized access, alteration, disclosure, or
              destruction of personal information. However, no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security of your personal information.
            </p>
          </li>
          <li>
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              The website may use cookies and similar tracking technologies to enhance user experience, personalize content, and analyze
              website traffic. You can adjust your browser settings to refuse cookies or provide notification when cookies are being sent.
              However, certain website features may not function properly without cookies.
            </p>
          </li>
          <li>
            <h2>Third-Party Links</h2>
            <p>
              The website may contain links to third-party websites or services. Charlotte Imports / THORSMEX, S.A de C.V. is not responsible
              for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of those sites.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}