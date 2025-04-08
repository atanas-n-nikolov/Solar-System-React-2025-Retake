import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from 'react-router';
import { updateUserData, useQuizWithUserAnswers } from '../../../api/userAPI';
import { UserContext } from "../../../context/UserContext";
import { useSubmitQuiz } from "../../../api/quizAPI";

import style from './QuizForm.module.css';

export default function QuizForm() {
    const { category } = useParams();
    const { _id } = useContext(UserContext);
    const { quiz, allAnswered, noQuizInCategory, error } = useQuizWithUserAnswers(_id, category);

    const [seconds, setSeconds] = useState(3);
    const navigate = useNavigate();
    const hasNavigated = useRef(false);

    // Състояние за отговорите на потребителя
    const [userAnswers, setUserAnswers] = useState({});

    // Функция за обработка на избор на отговор
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuiz();
    };

    const { submitQuiz, result, loading, submitError } = useSubmitQuiz(quiz, userAnswers);

    useEffect(() => {
        if (result !== null && result !== undefined) {
            if (_id) {
                updateUserData(_id, { score: result.score, answers: result.correctAnswers })
                    .then((response) => {
                        console.log("User score updated:", response);
                    })
                    .catch((err) => {
                        console.error("Error updating user score:", err);
                    });
            }

            const timer = setInterval(() => {
                setSeconds((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        if (!hasNavigated.current) {
                            hasNavigated.current = true;
                            setTimeout(() => {
                                navigate('/');
                            }, 0);
                        }
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [result, navigate, _id]);

    if (noQuizInCategory) {
        return <h2>No quiz in this category yet</h2>;
    }

    return (
        <div className={style.quizWrapper}>
            {result !== null && result !== undefined && (
                <div className={style.result}>
                    <h2>Your score is:</h2>
                    <h2>{result.score}/{quiz.length}</h2>
                    <p>
                        You will be redirected to Quiz after <span className={style.timer}>{seconds}</span> seconds
                        or <Link to="/quiz" className={style.redirect-link}>click here</Link> to go now.
                    </p>
                    <div>
                        <h3>Correct Answers:</h3>
                        <ul>
                            {result.correctAnswers.map((answer) => (
                                <li key={answer.questionId}>Question ID: {answer.questionId}, Correct Answer: {answer.correctAnswer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {result === null && !error && quiz.length > 0 && (
                <div className={style.quiz-form}>
                    <form onSubmit={handleSubmit}>
                        {quiz.map((question) => (
                            <div key={question._id}>
                                <h2>{question.title}</h2>
                                <div>
                                    {question.options.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                id={`${question._id}-${option}`}
                                                name={question._id}
                                                value={option}
                                                checked={userAnswers[question._id] === option} // Контролирано състояние
                                                onChange={() => handleAnswerChange(question._id, option)} // Обработва избора
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
                            disabled={loading}
                        >
                            Submit
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
