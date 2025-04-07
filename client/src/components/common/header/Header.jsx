import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';

import styles from '../header/Header.module.css';

export default function Header() {

    const { email, isAuthenticated, _id } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logoContainer}>
                    <Link to="/" className={styles.logo}>
                        <img
                            src="/images/solar-system.svg"
                            alt="Logo"
                            className={styles.logoImg}
                        />
                        <span className={styles.logoText}>Solar System</span>
                    </Link>
                </div>
                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link to="/" className={styles.navLink}>
                                Home
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/planets" className={styles.navLink}>
                                Planets
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className={styles.navItem}>
                                    <Link to="/quiz" className={styles.navLink}>
                                        Quiz
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link to={`/profile/${_id}`} className={styles.navLink}>
                                        {email}
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link to="/logout" className={styles.navLink}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className={styles.navItem}>
                            <Link to="/sign-up" className={styles.navLink}>
                                Sign up
                            </Link>
                        </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};