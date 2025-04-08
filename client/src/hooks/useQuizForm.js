import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSubmitQuiz } from "../api/quizAPI";
import { updateUserData } from "../api/userAPI";

export function useQuizForm(quiz, userAnswers, _id) {
    const [seconds, setSeconds] = useState(3);
    const [userAnswersState, setUserAnswersState] = useState(userAnswers);
    const navigate = useNavigate();
    const hasNavigated = useRef(false);

    const { submitQuiz, result, loading, submitError } = useSubmitQuiz(quiz, userAnswersState);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswersState(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuiz();
    };

    const updateUserScore = async () => {
        if (_id && result) {
            try {
                await updateUserData(_id, { score: result.score, answers: result.correctAnswers });
                console.log("User score updated:", result);
            } catch (err) {
                console.error("Error updating user score:", err);
            }
        }
    };

    useEffect(() => {
        if (result !== null && result !== undefined) {
            updateUserScore();
            const timer = setInterval(() => {
                setSeconds((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        if (!hasNavigated.current) {
                            hasNavigated.current = true;
                            setTimeout(() => navigate('/'), 0);
                        }
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [result, navigate]);

    return {
        seconds,
        handleAnswerChange,
        handleSubmit,
        userAnswersState,
        result,
        loading,
        submitError
    };
}
