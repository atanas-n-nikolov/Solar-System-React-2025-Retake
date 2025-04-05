import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export function NextArrow({ onClick }) {
    return (
        <div className="next-arrow" onClick={onClick}>
            <FaAngleRight size={30} />
        </div>
    );
}

export function PrevArrow({ onClick }) {
    return (
        <div className="prev-arrow" onClick={onClick}>
            <FaAngleLeft size={30} />
        </div>
    );
}
