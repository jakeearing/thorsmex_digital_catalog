import '../../assets/styles/header.css';
import { Link } from 'react-router-dom';
import thorsmexLogo from '../../assets/images/logos/thorsmex-logo.png';

export default function Header() {
    return(
        <div className="title">
            <Link to="/">
                <img className="header-photo" src={thorsmexLogo} alt="Thorsmex logo" />
            </Link>
        </div>
    );
}
