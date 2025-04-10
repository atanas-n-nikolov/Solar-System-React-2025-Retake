import React from 'react';
import { Link } from 'react-router';
import styles from './AdminProfile.module.css';

const AdminProfile = () => {
    return (
        <div className={styles.container}>
            <h2>Админ профил</h2>

            <div className={styles.section}>
                <h3>Факти</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Създаване на нов факт</h4>
                        <Link to="/create-fact" className={styles.createLink}>
                            Създайте нов факт
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Редактиране или изтриване на факт</h4>
                        <Link to="/fact/edit-fact" className={styles.editLink}>
                            Редактиране/Изтриване на факт
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Планети</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Създаване на нова планета</h4>
                        <Link to="/create-planet" className={styles.createLink}>
                            Създайте нова планета
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Редактиране или изтриване на планета</h4>
                        <Link to="/planet/edit-planet" className={styles.editLink}>
                            Редактиране/Изтриване на планета
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Въпроси</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Създаване на нов въпрос</h4>
                        <Link to="/create-quiz" className={styles.createLink}>
                            Създайте нов въпрос
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Редактиране или изтриване на въпрос</h4>
                        <Link to="/quiz/edit-quiz" className={styles.editLink}>
                            Редактиране/Изтриване на въпрос
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
