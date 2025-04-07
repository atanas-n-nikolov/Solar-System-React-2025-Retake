import { Link } from 'react-router';
import style from './Planets.module.css';
import { usePlanets } from '../../api/planetsAPI';
import { useNotificationContext } from '../../context/NotificationContext';

export default function Planets() {
    const { planets, error, loading } = usePlanets();
    const { showNotification } = useNotificationContext();

    if (loading) {
        return <h2 className={style.loading}>Loading...</h2>;
    };

    if (error) {
        showNotification(error, 'error');
    };

    return (
        <div className={style.planetsWrapper}>
            <h1 className={style.planetsHeader}>Solar System Planets</h1>

            <div className={style.welcome}>
                <img className={style.welcomeImage} src="images/planets-image.png" alt="planets-image" />
                <p className={style.welcomeIntro}>Welcome, cosmic explorer! Prepare to venture through the vast wonders of our solar system. Discover the secrets of each planet and explore their unique characteristics. Select your planet and begin your celestial journey!</p>
            </div>

            <div className={style.wrapperP}>
                {planets.length > 0 ? (
                    planets.map(planet => {
                        return (
                            <div key={planet._id} className={style.planetContainer}>
                                <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className={style.planetImage}
                                />
                                <div className={style.planetContent}>
                                    <h2 className={style.planetTitle}>{planet.name}</h2>
                                    <p className={style.planetType}>Type: {planet.type}</p>
                                    <p className={style.planetType}>Distance: {planet.distanceToSun}</p>
                                    <p className={style.planetType}>Size: {planet.size}</p>
                                    <Link to={`/planet/${planet._id}`} className={style.planetButton}>Learn More</Link>
                                </div>
                            </div>
                        );
                    })
                ) : <h2>No planets yet</h2>}
            </div>
        </div>
    );
}
