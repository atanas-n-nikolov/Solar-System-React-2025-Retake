import './App.css';
import Header from './components/common/header/Header';
import Home from './components/home/Home';

export default function App() {

    return (
        <div className="app-wrapper">
            <Header />
            <main className="main-content">
                <Home />
            </main>
        </div>
    )
};