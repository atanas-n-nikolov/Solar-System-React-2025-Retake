import { Route, Routes } from 'react-router';

import UserProvider from './providers/UserProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import GuestGuard from './components/guards/GuestGuard';
import UserGuard from './components/guards/userGuard';

import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import Planets from './components/planets/Planets';
import Quiz from './components/quiz/Quiz';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ErrorNotification from './components/error/ErrorNotification';
import Logout from './components/auth/logout/Logout';

import './App.css';
import PlanetDetails from './components/planets/planetDetails/PlanetDetails';
import QuizForm from './components/quiz/quizForm/QuizForm';
import UserProfile from './components/auth/user/UserProfile';


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
                            <Route path="/planet/:planetId" element={<PlanetDetails />} />
                            <Route element={<GuestGuard />}>
                                <Route path="/sign-up" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                            </Route>
                            <Route element={<UserGuard />}>
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/quiz" element={<Quiz />} />
                                <Route path="/quiz/:category" element={<QuizForm />} />
                                <Route path="/profile/:userId" element={<UserProfile />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </NotificationProvider>
        </UserProvider>
    )
};