import { Link } from 'react-router';
import style from './LastQuiz.module.css';
import { useLatestQuiz } from '../../../api/quizAPI';
import { useNotificationContext } from '../../../context/NotificationContext';
import { useEffect } from 'react';

export default function LastQuiz() {
    const { latestQuiz, error } = useLatestQuiz();
    const { showNotification } = useNotificationContext();

    useEffect(() => {
        if (error) {
            showNotification(error, 'error');
        }
    }, [error, showNotification]);

    return (
        <div className={style.wrapperQ}>
            <div className={style.homeContainer}>
                <div className={style.homeLeft}>
                    <h1>Welcome, Space Traveler!</h1>
                    <p>
                        Ready to test your knowledge across the cosmos? Embark on a thrilling journey through quizzes of all levels, from the basics of space exploration to the mysteries of distant galaxies. Challenge yourself with different missions and see how far you can go! Answer questions, earn points, and rise through the ranks as you prove your knowledge. Whether you're a Cadet or an experienced Explorer, there's always a new mission to conquer and a higher rank to achieve. Track your progress, compete with others, and see who leads the cosmic leaderboard! Choose your mission, get ready, and launch it! 🚀
                    </p>
                    <Link to="/quiz" className={style.homeStartButton}>Start Your Quiz Quest</Link>
                </div>

                <div className={style.homeRight}>
                    <h2>Last Added Quiz</h2>

                    {latestQuiz?.title ? (
                        <>
                            <div className={style.lastQuizCard}>
                                <h3>{latestQuiz.title}</h3>
                                <p>Mission Level: {latestQuiz.category}</p>
                            </div>
                            <Link to={`/quiz/${latestQuiz.category}`} className={style.homeStartButton}>Start Mission</Link>
                        </>
                    ) : (
                        <p>No quizzes available yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
