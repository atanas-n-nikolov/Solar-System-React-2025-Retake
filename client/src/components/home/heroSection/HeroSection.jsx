import { Link } from 'react-router';

import styles from '../heroSection/HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>Explore the Solar System</h2>
                    <p>Learn everything about planets, stars, and space exploration!</p>
                    <Link to="/planets" className={styles.actionBtn}>Start Now</Link>
                </div>
            </div>
        </section>
    );
}
