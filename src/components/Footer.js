import { Link } from 'react-router-dom';
import '../assets/styles/footer.css';
import cimpoLogo from '../assets/images/logos/cimpo-logo.jpg';
import facebookIcon from '../assets/images/logos/facebook.png';
import twitterIcon from '../assets/images/logos/twitter.png';
import instagramIcon from '../assets/images/logos/instagram.png';

export default function Footer () {
  return (
    <div>
      <div className="footer-container">
        <h2>CONTACT 24/7</h2>
        <div className="footer-info">
          <div>
            <h4>PHONE</h4>
            <p>1-800-950-0860</p>
          </div>
          <div>
            <h4>EMAIL</h4>
            <p>info@thorsmanmx.com</p>
          </div>
          <div>
            <h4>SERVICE AREAS</h4>
            <p>U.S.A., Mexico and all the world</p>
          </div>
          <div>
            <h4>FOLLOW US</h4>
            <div className="footer-social">
              <img src={facebookIcon} alt="Facebook" />
              <img src={twitterIcon} alt="Twitter" />
              <img src={instagramIcon} alt="Instagram" />
            </div>
          </div>
        </div>

        <p className="inquiry-text">
          For any inquiries about our products in English or Spanish, let us know by submitting your information below!
        </p>
        <div className="inquiry-box">

        </div>

        <div className="footer-logo">
          <img src={cimpoLogo} alt="Charlotte Imports" />
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 THORSMANMX &nbsp;&nbsp; DESIGN BY KLIP.MX
      </div>
    </div>
  );
};
