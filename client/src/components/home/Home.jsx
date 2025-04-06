import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HeroSection from "./heroSection/HeroSection";
import PlanetSlider from "./planetSlider/PlanetSlider";

import style from './planetSlider/PlanetSlider.module.css';

export default function Home() {
    return(
        <>
            <HeroSection />
            <section className={style.sliderWrapper}>
                <div className={style.planetsTitle}>
                    <h2>Journey Through the Solar System</h2>
                </div>
                <PlanetSlider />
                <section className={style.something}>
                </section>
            </section>
        </>
    )
}