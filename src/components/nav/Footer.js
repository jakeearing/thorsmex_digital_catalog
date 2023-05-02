import '../../assets/styles/footer.css';
import { Link } from 'react-router-dom';
import cimpoLogo from '../../assets/images/logos/cimpo-logo.jpg';

export default function Footer() {
    return (
        <div className="footer-container">
            <Link to="/">
                <img className="footer-photo" src={cimpoLogo} alt="Charlotte Imports logo" />
            </Link>
            <div className="footer-nav">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Contact Us</Link></li>
                        <li><Link to="/">About Us</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}