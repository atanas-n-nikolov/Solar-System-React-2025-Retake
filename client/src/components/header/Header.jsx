import { Link } from 'react-router';

export default function Header() {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo-container">
                    <Link to="/" className="logo">
                        <img
                            src="/images/solar-system.svg"
                            alt="Logo"
                            className="logo-img"
                        />
                        <span className="logo-text">Solar System</span>
                    </Link>
                </div>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/planets" className="nav-link">
                                Planets
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/quiz" className="nav-link">
                                Quiz
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-link">
                                Sign up
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};