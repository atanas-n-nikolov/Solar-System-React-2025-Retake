import './App.css'
import Header from './components/common/header/Header'
import HeroSection from './components/home/heroSection/HeroSection'

export default function App() {

    return (
        <div className="app-wrapper">
            <Header />
            <main className="main-content">
                <HeroSection />
            </main>
        </div>
    )
};