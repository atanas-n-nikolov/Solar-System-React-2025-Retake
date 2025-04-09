import { usePlanets } from "../../../api/planetsAPI";
import Slider from "react-slick";
import PlanetCard from './PlanetCard';
import { NextArrow, PrevArrow } from './Arrow';
import { useNotificationContext } from "../../../context/NotificationContext";

import style from './PlanetSlider.module.css';
import { useEffect } from "react";

export default function PlanetSlider() {
    const { planets, error, loading } = usePlanets();
    const { showNotification } = useNotificationContext();

    useEffect(() => {
        if (error) {
            showNotification(error, 'error');
        };
    }, [error, showNotification]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (loading) {
        return <h2 className={style.loading}>Loading...</h2>;
    };

    if (!planets?.length) {
        return null;
    };

    return (
        <div className={style.planetsContainer}>
            <Slider className="catalog-slider" {...settings}>
                {planets.map((planet) => (
                    <PlanetCard key={planet._id} planet={planet} />
                ))}
            </Slider>
        </div>
    );
}
