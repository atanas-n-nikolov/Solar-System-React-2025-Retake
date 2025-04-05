import Slider from "react-slick";
import PlanetCard from './PlanetCard';
import ErrorNotification from '../../errorNotification/ErrorNotification';
import { NextArrow, PrevArrow } from './Arrow';
import { usePlanets } from "../../../api/planetsAPI";
import './PlanetSlider.css';

export default function PlanetSlider() {
    const { planets, error } = usePlanets();

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="planets-container" style={{ padding: planets.length === 0 ? "0" : "" }}>
            {error && <ErrorNotification message={error} type="error" />}
            {planets.length > 0 ? (
                <Slider className="catalog-slider" {...settings}>
                    {planets.map((planet) => (
                        <PlanetCard key={planet._id} planet={planet} />
                    ))}
                </Slider>
            ) : (
                <p>No planets available at the moment.</p>
            )}
        </div>
    );
}
