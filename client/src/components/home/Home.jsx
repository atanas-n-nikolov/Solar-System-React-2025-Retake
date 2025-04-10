import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { lazy, Suspense } from 'react';

import HeroSection from "./heroSection/HeroSection";

import style from './planetSlider/PlanetSlider.module.css';
import FactOfTheDay from "./factOfTheDay/FactOfTheDay";
import LastQuiz from "./lastQuiz/LastQuiz";

const PlanetSlider = lazy(() => import('./planetSlider/PlanetSlider'));

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
                    <FactOfTheDay />
                    <LastQuiz />
                </section>
            </section>
        </>
    )
}