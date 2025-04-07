import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import Planets from './components/planets/Planets';
import Quiz from './components/quiz/Quiz';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import UserProvider from './providers/UserProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import ErrorNotification from './components/error/ErrorNotification';
import Logout from './components/auth/logout/Logout';

export default function App() {

    return (
        <UserProvider>
            <NotificationProvider>
                <div className="app-wrapper">
                    <Header />
                    <ErrorNotification />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/planets" element={<Planets />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/sign-up" element={<Register />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </NotificationProvider>
        </UserProvider>
    )
};