import { Link } from 'react-router';

import style from './PlanetSlider.module.css';

export default function PlanetCard({ planet }) {

    return (
        <div className="p-2">
            <div className={style.cardContainer}>
                <img
                    src={planet.image}
                    alt={planet.name}
                    className={style.cardImage}
                />
                <div className={style.cardContent}>
                    <h2 className={style.cardTitle}>{planet.name}</h2>
                    <p className={style.cardType}>Type: {planet.type}</p>
                    <Link to={`/planet/${planet._id}`} className={style.cardButton}>Learn More</Link>
                </div>
            </div>
        </div>
    );
}
