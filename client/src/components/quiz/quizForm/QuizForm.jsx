import { useContext, useState } from "react";
import { useParams, Link } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { useQuizWithUserAnswers } from "../../../api/userAPI";
import style from './QuizForm.module.css';
import { useQuizForm } from "../../../hooks/useQuizForm";

export default function QuizForm() {
    const { category } = useParams();
    const { _id } = useContext(UserContext);
    const { quiz, allAnswered, noQuizInCategory, error } = useQuizWithUserAnswers(_id, category);

    const [userAnswers, setUserAnswers] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const {
        seconds,
        handleAnswerChange,
        handleSubmit,
        result,
        loading,
        submitError
    } = useQuizForm(quiz, userAnswers, _id);

    const handleAnswerChangeLocal = (questionId, answer) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
        handleAnswerChange(questionId, answer);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (Object.keys(userAnswers).length !== quiz.length) {
            return alert("Please answer all the questions before submitting!");
        }
        
        setIsFormSubmitted(true);
        await handleSubmit(e);
    };

    if (noQuizInCategory) {
        return <h2>No quiz in this category yet</h2>;
    }

    if (error || submitError) {
        return <h2>There was an error. Please try again later.</h2>;
    }

    return (
        <div className={style.quizWrapper}>
            {result !== null && result !== undefined && (
                <div className={style.result}>
                    <h2>Your score is:</h2>
                    <h2>{result.score}/{quiz.length}</h2>
                    <p>
                        You will be redirected to Quiz after <span className={style.timer}>{seconds}</span> seconds
                        or <Link to="/quiz" className={style.redirectLink}>click here</Link> to go now.
                    </p>
                </div>
            )}

            {result === null && !error && quiz.length > 0 && (
                <div className={style.quizForm}>
                    <form onSubmit={handleFormSubmit}>
                        {quiz.map((question) => (
                            <div key={question._id} className={style.question}>
                                <h2>{question.title}</h2>
                                <div className={style.options}>
                                    {question.options.map((option, index) => (
                                        <div key={index} className={style.option}>
                                            <input
                                                type="radio"
                                                id={`${question._id}-${option}`}
                                                name={question._id}
                                                value={option}
                                                checked={userAnswers[question._id] === option}
                                                onChange={() => handleAnswerChangeLocal(question._id, option)}
                                            />
                                            <label htmlFor={`${question._id}-${option}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className={style.quizButton}
                            disabled={loading || isFormSubmitted}
                        >
                            {isFormSubmitted ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}

            {allAnswered && !error && (
                <h2>You have answered all the questions in this category!</h2>
            )}
        </div>
    );
}
