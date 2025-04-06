import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import style from './PlanetSlider.module.css';

export function NextArrow({ onClick }) {
    return (
        <div className={style.nextArrow} onClick={onClick}>
            <FaAngleRight size={30} />
        </div>
    );
}

export function PrevArrow({ onClick }) {
    return (
        <div className={style.prevArrow} onClick={onClick}>
            <FaAngleLeft size={30} />
        </div>
    );
}
