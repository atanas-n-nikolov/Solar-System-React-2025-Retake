import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./AdminProfile.module.css";
import { UserContext } from "../../../context/UserContext";

export default function AdminProfile() {
    const { firstName, lastName, role } = useContext(UserContext);
    const navigate = useNavigate();

    const handleNavigateToAdminPage = () => {
        if (userData?.role === 'admin') {
            navigate('/admin-dashboard');
        }
    };

    return (
        <div className={styles.profileNavigation}>
            <h2 onClick={handleNavigateToAdminPage} className={styles.userName}>
                {firstName} {lastName}
            </h2>
            {role === 'admin' && (
                <div className={styles.adminButtons}>
                    <Link to="/create-fact" className={styles.createLink}>Create Fact</Link>
                    <Link to="/create-planet" className={styles.createLink}>Create Planet</Link>
                    <Link to="/create-quiz" className={styles.createLink}>Create Quiz</Link>
                </div>
            )}
        </div>
    );
}
