import React from 'react';
import { Link } from 'react-router';
import styles from './AdminProfile.module.css';

const AdminProfile = () => {
    return (
        <div className={styles.container}>
            <h2>Admin Profile</h2>

            <div className={styles.section}>
                <h3>Facts</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Create new fact</h4>
                        <Link to="/create-fact" className={styles.createLink}>
                            Create new fact
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Edit or delete fact</h4>
                        <Link to="/fact/edit-fact" className={styles.editLink}>
                            Edit/delete fact
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Planets</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Create new planet</h4>
                        <Link to="/create-planet" className={styles.createLink}>
                            Create new planet
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Edit or delete planet</h4>
                        <Link to="/planet/edit-planet" className={styles.editLink}>
                            Edit/Delete planet
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Въпроси</h3>
                <div className={styles.linksContainer}>
                    <div className={styles.linkItem}>
                        <h4>Create new quiz</h4>
                        <Link to="/create-quiz" className={styles.createLink}>
                            Create new quiz
                        </Link>
                    </div>

                    <div className={styles.linkItem}>
                        <h4>Create/Edit quiz</h4>
                        <Link to="/quiz/edit-quiz" className={styles.editLink}>
                            Create/Edit quiz
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
