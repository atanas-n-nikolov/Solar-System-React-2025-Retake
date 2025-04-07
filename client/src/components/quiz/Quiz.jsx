import { useQuiz } from '../../api/quizAPI';
import { Link } from 'react-router';
import { groupByCategory } from '../../util/groupByCategory';

import style from './Quiz.module.css';

export default function Quiz() {
    const { quiz, error, loading } = useQuiz();
    const { showNotification } = useNotificationContext();

    if (loading) {
        return <h2 className={style.loading}>Loading...</h2>;
    };

    if (error) {
        showNotification(error, 'error');  
    };

    const categories = groupByCategory(quiz);

    return (
        <div className={style.quizContainer}>
            <h1 className={style.quizTitle}>Quiz Quest</h1>
            <div className={style.welcome}>
                <img className={style.quizImage} src="images/quiz-image.png" alt="quiz-image" />
                <p className={style.welcomeIntro}>
                    Welcome, space traveler! Prepare to embark on a journey across galaxies of knowledge. Choose your mission and begin your quest!
                </p>
            </div>
            {quiz.length > 0 ? (
                <div className={style.quizGrid}>
                    {Object.keys(categories).map((category) => (
                        <div key={category} className={style.quizCard}>
                            <h2 className={style.quizCardTitle}>{category} Missions</h2>
                            <p className={style.quizCardCount}>Number of Questions: {categories[category].length}</p>
                            <p className={style.quizCardDifficulty}>Mission Level: {category}</p>
                            <Link to={`/quiz/${category}`} className={style.quizButton}>Launch Mission</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className={style.quizTitle}>No quizzes available at the moment</h1>
            )}
        </div>
    );
}
