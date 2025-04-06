import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import style from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <div className={style.footerContent}>
                    <nav className={style.footerNav}>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Terms of Service</Link></li>
                        </ul>
                    </nav>
                    <div className={style.footerSocials}>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
                <p className={style.footerText}>© 2025 Solar System - All Rights Reserved</p>
        </footer>
    )
}
