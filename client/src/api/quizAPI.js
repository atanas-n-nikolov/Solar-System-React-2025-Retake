import { useEffect, useState } from "react";
import request from "./request";

const baseUrl = 'http://localhost:3000/quiz';

export const useQuiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await request.get(baseUrl);
                setQuiz(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to load Quiz. Please try again later.');
                setLoading(false);
            };
        };

        fetchQuiz();
    }, []);

    return { quiz, error, loading };
};

export const useAllQuiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await request.get(`${baseUrl}/full`);
                setQuiz(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to load Quiz. Please try again later.');
                setLoading(false);
            };
        };

        fetchQuiz();
    }, []);

    return { quiz, error, loading };
};

export const useLatestQuiz = () => {
    const [latestQuiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await request.get(`${baseUrl}/latest`);
                setQuiz(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to load Quiz. Please try again later.');
                setLoading(false);
            };
        };

        fetchQuiz();
    }, []);

    return { latestQuiz, error, loading };
};

export const useAddQuiz = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const addQuiz = async (quizData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        console.log(quizData);
        

        try {
            const response = await request.post(`${baseUrl}/create`, quizData);
            if (response && response._id) {
                setSuccess(true);
            } else {
                setError('Failed to create fact. Please try again.');
            }
        } catch (error) {
            setError('Failed to create fact. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { addQuiz, loading, error, success };
};

export const useSubmitQuiz = (quizData, userAnswers) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateScore = () => {
        let score = 0;
        const correctAnswers = [];

        quizData.forEach((question) => {
            if (userAnswers[question._id] === question.correctAnswer) {
                score += 1;
                correctAnswers.push({
                    questionId: question._id,
                    category: question.category,
                    title: question.title,
                    correctAnswer: question.correctAnswer
                });
            }
        });

        return { score, correctAnswers };
    };

    const submitQuiz = () => {
        setLoading(true);
        try {
            const { score, correctAnswers } = calculateScore();
            setResult({ score, correctAnswers });
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { submitQuiz, result, loading, error };
};

export const useUpdateQuiz = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateQuiz = async (quizId, quizData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const dataToSend = { ...quizData, quizId };

        try {
            const response = await request.put(`${baseUrl}/edit`, dataToSend);
            setSuccess(true);
            console.log('Quiz updated:', response);
        } catch (error) {
            setError('Failed to update quiz. Please try again later.');
            console.error('Error updating quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    return { updateQuiz, loading, error, success };
};

export const useDeleteQuiz = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteQuiz = async (quizId) => {
        setLoading(true);
        try {
            const response = await request.delete(`${baseUrl}/delete`, {
                data: { quizId }
            });
            if (response) {
                setSuccess(true);
                setError(null);
            } else {
                setError('Failed to delete quiz. Please try again.');
            }
        } catch (err) {
            setError('Failed to delete quiz. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { deleteQuiz, error, loading, success };
};
