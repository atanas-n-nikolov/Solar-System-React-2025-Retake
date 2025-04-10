import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';
import Spinner from './components/common/spinner/Spinner';

import UserProvider from './providers/UserProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import GuestGuard from './components/guards/GuestGuard';
import UserGuard from './components/guards/userGuard';

import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ErrorNotification from './components/error/ErrorNotification';
import Logout from './components/auth/logout/Logout';

import './App.css';
import PlanetDetails from './components/planets/planetDetails/PlanetDetails';
import QuizForm from './components/quiz/quizForm/QuizForm';
import UserProfile from './components/auth/user/UserProfile';
import AdminProfile from './components/auth/admin/AdminProfile';
import CreateFact from './components/auth/admin/create/fact/CreateFact';
import CreateQuiz from './components/auth/admin/create/quiz/CreateQuiz';
import CreatePlanet from './components/auth/admin/create/planet/CreatePlanet';

const Planets = lazy(() => import('./components/planets/Planets'));
const Quiz = lazy(() => import('./components/quiz/Quiz'));


export default function App() {

    return (
        <UserProvider>
            <NotificationProvider>
                <div className="app-wrapper">
                    <Header />
                    <ErrorNotification />
                    <main className="main-content">
                        <Suspense fallback={<Spinner />}>
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
                                    <Route path="/admin-dashboard" element={<AdminProfile />} />
                                    <Route path="/create-fact" element={<CreateFact />} />
                                    <Route path="/create-quiz" element={<CreateQuiz />} />
                                    <Route path="/create-planet" element={<CreatePlanet />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </NotificationProvider>
        </UserProvider>
    )
};