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
