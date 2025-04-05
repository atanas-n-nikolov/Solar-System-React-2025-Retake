import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './planet-card/custom-slider.css';

import HeroSection from "./heroSection/HeroSection";
import PlanetSlider from "./planetSlider/PlanetSlider";

export default function Home() {
    return(
        <>
            <HeroSection />
            <section className="slider-wrapper">
                <div className="planets-title">
                    <h2>Journey Through the Solar System</h2>
                </div>
                <PlanetSlider />
                <section className="something">
                </section>
            </section>
        </>
    )
}