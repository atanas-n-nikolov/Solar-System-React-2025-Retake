import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useUserProfile from "../../../hooks/useUserProfile";
import { UserContext } from "../../../context/UserContext";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { userLogoutHandler } = useContext(UserContext);

    const { userData, comments, answers, loading, error } = useUserProfile(userId);

    const handleDeleteUser = async () => {
        try {
            const success = await deleteUser(userId, userLogoutHandler);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            setError("Error deleting user.");
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileData}>
                <h1>{userData?.firstName} {userData?.lastName}</h1>
                <p>Email: {userData?.email}</p>
                <p>Score: {userData?.score}</p>
            </div>

            <div className={styles.buttonsContainer}>
                <Link to={`/profile/${userId}/edit`} className={styles.editProfileLink}>Edit Profile</Link>
                <button onClick={handleDeleteUser} className={styles.deleteUserButton}>
                    Delete Account
                </button>
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
