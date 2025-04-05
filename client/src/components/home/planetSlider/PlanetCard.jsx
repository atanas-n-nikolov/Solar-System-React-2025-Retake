import { Link } from 'react-router';

export default function PlanetCard({ planet }) {
    return (
        <div className="p-2">
            <div className="card-container">
                <img
                    src={planet.image}
                    alt={planet.name}
                    className="card-image"
                />
                <div className="card-content">
                    <h2 className="card-title">{planet.name}</h2>
                    <p className="card-type">Type: {planet.type}</p>
                    <Link to={`/planet/${planet._id}`} className="card-button">Learn More</Link>
                </div>
            </div>
        </div>
    );
}
