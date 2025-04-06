import './App.css';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Home from './components/home/Home';

export default function App() {

    return (
        <div className="app-wrapper">
            <Header />
            <main className="main-content">
                <Home />
            </main>
            <Footer />
        </div>
    )
};