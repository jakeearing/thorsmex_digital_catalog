import { Link } from 'react-router-dom';
import '../assets/styles/footer.css';
import cimpoLogo from '../assets/images/logos/cimpo-logo.jpg';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="left-nav">
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about-us">About</Link></li>
              <li><Link to="/products">Catalog</Link></li>
              <li><Link to="/contact-us">Contact</Link></li>
              <li><Link to="/promotions">Promos</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-logo">
          <Link to="/">
            <img src={cimpoLogo} alt="Charlotte Imports Logo" />
          </Link>
        </div>
        <div className="copyright-right-nav">
          <div className="right-nav">
            <div className="social-media">
              <a href="https://www.youtube.com/channel/UCKvQ-LQyrH94RGB0VAoSY0Q"><img src={process.env.PUBLIC_URL + "/svg-icons/social-media/youtube-logo.svg"} alt="Youtube Icon" /></a>
              <a href="https://www.instagram.com/clt.imp/"><img src={process.env.PUBLIC_URL + "/svg-icons/social-media/instagram-logo.svg"} alt="Instagram Icon" /></a>
            </div>
            <div className="terms">
              <Link to="/terms-of-use">Terms of Use</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            </div>
            <div className="copyright">
              <p>Copyright &copy; 2023 Charlotte Imports - All Rights Reserved</p>
            </div>
        </div>
      </div>
    </div>
  );
}
