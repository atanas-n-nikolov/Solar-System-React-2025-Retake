import { usePlanets } from "../../../api/planetsAPI";
import Slider from "react-slick";
import PlanetCard from './PlanetCard';
import { NextArrow, PrevArrow } from './Arrow';
import { useNotificationContext } from "../../../context/NotificationContext";

import style from './PlanetSlider.module.css';

export default function PlanetSlider() {
    const { planets, error, loading } = usePlanets();
    const { showNotification } = useNotificationContext();

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (loading) {
        return <h2 className={style.loading}>Loading...</h2>;
    };

    if (error) {
        showNotification(error, 'error');
    };

    return (
        <div className={style.planetsContainer} style={{ padding: planets.length === 0 ? "0" : "" }}>
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
