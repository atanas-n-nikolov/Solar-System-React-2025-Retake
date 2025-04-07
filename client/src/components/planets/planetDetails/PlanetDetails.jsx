import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { usePlanet } from '../../../api/planetsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';
import { addCommentToPlanet, deleteCommentFromPlanet } from '../../../api/planetsAPI';

import style from './PlanetDetails.module.css';
import { useState } from 'react';

export default function PlanetDetails() {
    const { isAuthenticated, _id: userId } = useAuth();
    const { planetId } = useParams();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);
    const { showNotification } = useNotificationContext();
    const [newComment, setNewComment] = useState('');

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
            setCommentError('Failed to add comment.');
            console.error('Error adding comment:', err);
        }

        setNewComment('');
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
            console.error('Error deleting comment:', err);
            setCommentError('Failed to delete comment.');
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
                                    <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
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
