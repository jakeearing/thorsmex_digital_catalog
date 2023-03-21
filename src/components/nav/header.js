import '../../style/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <div className="title">
            <Link to="/">
                <img src={process.env.PUBLIC_URL + '/thorsmex-logo.png'} alt="Thorsmex logo" />
            </Link>
        </div>
    );
}
