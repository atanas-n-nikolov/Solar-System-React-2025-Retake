import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useUserProfile from "../../../hooks/useUserProfile";
import { UserContext } from "../../../context/UserContext";
import styles from "./UserProfile.module.css";
import { deleteUser, updateUserData } from "../../../api/userAPI";
import { useNotificationContext } from "../../../context/NotificationContext";

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { userLogoutHandler } = useContext(UserContext);
    const { showNotification } = useNotificationContext();

    const { userData, comments, answers, loading, error } = useUserProfile(userId);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            });
        }
    }, [userData]);

    const handleDeleteUser = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
        if (!confirmed) return;
    
        try {
            const success = await deleteUser(userId, userLogoutHandler);
            if (success) navigate('/');
        } catch (err) {
            showNotification("Error deleting user.", 'error');
        }
    };

    const handleEditClick = () => setIsEditing(true);

    const handleCancelEdit = () => {
        setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
        });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            const updated = await updateUserData(userId, formData);
            if (updated) {
                showNotification("Profile updated successfully!", 'success');
                setIsEditing(false);
            }
        } catch (err) {
            showNotification("Error updating profile.", 'error');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileData}>
                {isEditing ? (
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName" className={styles.label}>First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName" className={styles.label}>Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <h1>{userData?.firstName} {userData?.lastName}</h1>
                        <p>Email: {userData?.email}</p>
                        <p>Score: {userData?.score}</p>
                    </>
                )}
            </div>

            <div className={styles.buttonsContainer}>
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className={styles.saveButton}>Save</button>
                        <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick} className={styles.editProfileLink}>Edit Profile</button>
                        <button onClick={handleDeleteUser} className={styles.deleteUserButton}>Delete Account</button>
                    </>
                )}
            </div>

            <div className={styles.commentsSection}>
                <h2>Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.commentId}>
                                <p><strong>Planet:</strong>
                                    <Link to={`/planet/${comment.planetId}`}>{comment.planetName}</Link>
                                </p>
                                <p><strong>Comment:</strong> {comment.commentText}</p>
                                <p><small>Posted on: {new Date(comment.createdAt).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={styles.answeredQuestionsSection}>
                <h2>Answered Questions</h2>
                {answers?.length === 0 ? (
                    <p>No questions answered yet.</p>
                ) : (
                    <ul>
                        {answers?.map((answer, index) => (
                            <li key={index}>
                                <p><strong>Question category:</strong> {answer.category}</p>
                                <p><strong>Question title:</strong> {answer.title}</p>
                                <p><small>Answered on: {new Date(answer.answeredOn).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
