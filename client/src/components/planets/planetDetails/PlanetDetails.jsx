import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { usePlanet } from '../../../api/planetsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';

import style from './PlanetDetails.module.css';
import { CommentForm } from '../../auth/user/comments/commentForm/CommentForm';
import { Comment } from '../../auth/user/comments/comment/Comment';

export default function PlanetDetails() {
    const { isAuthenticated } = useAuth();
    const { planetId } = useParams();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);
    const { showNotification } = useNotificationContext();

    if (loading) return <div>Loading...</div>;
    if (error) showNotification(error, 'error');

    const updatePlanetComments = (updatedComments) => {
        setPlanet((prev) => ({ ...prev, comments: updatedComments }));
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
                                planetId={planetId}
                                comment={comment}
                                updatePlanetComments={updatePlanetComments}
                            />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    <CommentForm
                        planetId={planetId}
                        updatePlanetComments={updatePlanetComments}
                    />
                </div>
            )}
        </div>
    );
}
