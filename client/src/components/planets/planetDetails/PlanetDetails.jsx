import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { editCommentInPlanet, deleteCommentFromPlanet, addCommentToPlanet, usePlanet } from '../../../api/planetsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';
import { useState } from 'react';

import style from './PlanetDetails.module.css';
import { CommentForm } from '../../auth/user/comments/commentForm/CommentForm';
import { Comment } from '../../auth/user/comments/comment/Comment';

export default function PlanetDetails() {
    const { isAuthenticated, _id: userId } = useAuth();
    const { planetId } = useParams();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);
    const { showNotification } = useNotificationContext();
    const [newComment, setNewComment] = useState('');
    const [pending, setIsPending] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState('');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        showNotification(error, 'error');
    }

    const handleSubmit = async (newComment) => {
        setIsPending(true);
        if (!newComment.trim()) {
            showNotification("Comment cannot be empty", 'error');
            return;
        }

        try {
            const response = await addCommentToPlanet(planetId, newComment);
            if (response) {
                setPlanet(response);
                setNewComment('');
            };
            setIsPending(false)
        } catch (err) {
            showNotification('Failed to add comment.', 'error');
            console.error('Error adding comment:', err);
            setIsPending(false)
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

    const handleEditSubmit = async () => {
        if (!editText.trim()) {
            showNotification("Comment text cannot be empty", 'error');
            return;
        }

        try {
            const updatedPlanet = await editCommentInPlanet(planetId, editCommentId, editText);
            setPlanet(updatedPlanet);
            setEditCommentId(null);
            setEditText('');
        } catch (err) {
            showNotification('Failed to update comment.', 'error');
            console.error('Error editing comment:', err);
        }
    };

    const handleCancel = () => {
        setEditCommentId(null);
        setEditText('');
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
                            <Comment
                                key={comment._id}
                                comment={comment}
                                onDelete={handleCommentDelete}
                                editCommentId={editCommentId}
                                isUserComment={comment.user._id === userId}
                                onEdit={handleEditClick}
                                onCancel={handleCancel}
                                onEditSubmit={handleEditSubmit}
                                editText={editText}
                                setEditText={setEditText}
                            />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    <CommentForm onSubmit={handleSubmit} initialValue={newComment} disabled={pending} />
                </div>
            )}
        </div>
    );
}
