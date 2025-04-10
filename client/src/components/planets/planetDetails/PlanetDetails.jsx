import { useNavigate, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useDeletePlanet, usePlanet } from '../../../api/planetsAPI';
import { useNotificationContext } from '../../../context/NotificationContext';

import style from './PlanetDetails.module.css';
import { CommentForm } from '../../auth/user/comments/commentForm/CommentForm';
import { Comment } from '../../auth/user/comments/comment/Comment';
import Spinner from '../../common/spinner/Spinner';

export default function PlanetDetails() {
    const { isAuthenticated, role } = useAuth();
    const { planetId } = useParams();
    const navigate = useNavigate();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);
    const { showNotification } = useNotificationContext();
    const { deletePlanet, error: deleteError, loading: deleteLoading } = useDeletePlanet();

    if (loading) return <Spinner />;
    if (error) showNotification(error, 'error');

    const updatePlanetComments = (updatedComments) => {
        setPlanet((prev) => ({ ...prev, comments: updatedComments }));
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this planet?');
        if (confirmDelete) {
            await deletePlanet(planetId);
            showNotification('Planet deleted successfully.', 'success');
            navigate(-1);
        };
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
            {role==="admin" && (
                <div className={style.deleteButtonWrapper}>
                    <button onClick={handleDelete} className={style.deleteButton} disabled={deleteLoading}>
                        {deleteLoading ? 'Deleting...' : 'Delete Planet'}
                    </button>
                    {deleteError && <p className={style.errorMessage}>{deleteError}</p>}
                </div>
            )}
        </div>
    );
}
