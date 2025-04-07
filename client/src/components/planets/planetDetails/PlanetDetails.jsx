import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { usePlanet } from '../../../api/planetsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';
import { addCommentToPlanet, deleteCommentFromPlanet, editCommentInPlanet } from '../../../api/planetsAPI';
import { useState } from 'react';

import style from './PlanetDetails.module.css';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export default function PlanetDetails() {
    const { isAuthenticated, _id: userId } = useAuth();
    const { planetId } = useParams();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);
    const { showNotification } = useNotificationContext();
    const [newComment, setNewComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState('');

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        showNotification(error, 'error');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            showNotification("Comment cannot be empty", 'error');
            return;
        };

        try {
            const response = await addCommentToPlanet(planetId, newComment);
            if (response) {
                setPlanet(response);
                setNewComment('');
            }
        } catch (err) {
            showNotification('Failed to add comment.', 'error');
            console.error('Error adding comment:', err);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const success = await deleteCommentFromPlanet(planetId, commentId);
            if (success) {
                setPlanet(prevPlanet => {
                    const updatedComments = prevPlanet.comments.filter(comment => comment._id !== commentId);
                    return { ...prevPlanet, comments: updatedComments };
                });
            }
        } catch (err) {
            showNotification('Failed to delete comment.', 'error');
            console.error('Error deleting comment:', err);
        }
    };

    const handleEditClick = (commentId, currentText) => {
        setEditCommentId(commentId);
        setEditText(currentText);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!editText.trim()) {
            showNotification("Comment text cannot be empty", 'error');
            return;
        }

        try {
            const updatedPlanet = await editCommentInPlanet(planetId, editCommentId, editText);
            setPlanet(updatedPlanet);
            setEditCommentId(null);  // Reset the edit state
            setEditText('');
        } catch (err) {
            showNotification('Failed to update comment.', 'error');
            console.error('Error editing comment:', err);
        }
    };

    return (
        <div className={style.planetDetails}>
            <div className={style.planetMain}>
                <div className={style.heroSection}>
                    <img src={planet.image} alt={planet.name} className={style.planetPicture} />
                </div>
                <div className={style.aside}>
                    <h1>{planet.name}</h1>
                    <p><strong>Type:</strong> {planet.type}</p>
                    <p><strong>Distance to Sun:</strong> {planet.distanceToSun}</p>
                    <p><strong>Size:</strong> {planet.size}</p>
                </div>
            </div>

            <div className={style.planetInfo}>
                <h3>More Information</h3>
                <p>{planet.description}</p>
            </div>

            {isAuthenticated && (
                <div className={style.planetComments}>
                    <h3>Comments</h3>
                    {planet.comments?.length > 0 ? (
                        planet.comments.map((comment) => (
                            <div key={comment._id} className={style.comment}>
                                <p>
                                    <strong>
                                        {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : 'Anonymous'}
                                    </strong>: {comment.text}
                                </p>
                                <p><em>{new Date(comment.createdAt).toLocaleString()}</em></p>
                                
                                {comment.user && comment.user._id === userId && (
                                    <>
                                        <button onClick={() => handleCommentDelete(comment._id)}>
                                            <FaTrash /> {/* Икона за изтриване */}
                                        </button>
                                        <button onClick={() => handleEditClick(comment._id, comment.text)}>
                                            <FaEdit /> {/* Икона за редактиране */}
                                        </button>
                                    </>
                                )}

                                {editCommentId === comment._id && (
                                    <form onSubmit={handleEditSubmit}>
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            placeholder="Edit your comment"
                                            rows="4"
                                        />
                                        <button type="submit">
                                            <FaCheck />
                                        </button>
                                        <button type="button" onClick={() => setEditCommentId(null)}>
                                            <FaTimes />
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    <form onSubmit={handleSubmit} autoComplete="on">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            rows="4"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}
