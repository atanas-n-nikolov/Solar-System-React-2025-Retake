import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3001/profile';

export const getUserData = (userId) => {
    return request.get(`${baseUrl}/${userId}`).catch(err => {
        throw err;
    });
};

export const updateUserData = (userId, updatedData) => {
    if(updatedData.score) {
        return request.put(`${baseUrl}/${userId}/score`, updatedData)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error in updateUserData:", err);
            throw err;
        });
    } else {
        return request.put(`${baseUrl}/${userId}/edit`, updatedData)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error in updateUserData:", err);
            throw err;
        });
    }

};

export const useQuizWithUserAnswers = (userId, category) => {
    const [quiz, setQuiz] = useState([]);
    const [userData, setUserData] = useState(null);
    const [allAnswered, setAllAnswered] = useState(false);
    const [noQuizInCategory, setNoQuizInCategory] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await request.get(`${baseUrl}/${userId}`);
                setUserData(userResponse);
            } catch (err) {
                setError('Failed to fetch user data.');
                console.error("Error fetching user data", err);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (userData && category) {
            const fetchQuestions = async () => {
                try {
                    const questionsResponse = await request.get(`http://localhost:3000/quiz/${category}`);

                    if (!questionsResponse || questionsResponse.length === 0) {
                        setNoQuizInCategory(true);
                        setQuiz([]);
                        setAllAnswered(false);
                        return;
                    }

                    if (userData.user && Array.isArray(userData.user.answers)) {
                        const filteredQuestions = questionsResponse.filter((question) =>
                            !userData.user.answers.some((answer) => answer.questionId === question._id)
                        );

                        setQuiz(filteredQuestions);
                        setAllAnswered(filteredQuestions.length === 0);
                        setNoQuizInCategory(false);
                    } else {
                        setQuiz(questionsResponse);
                        setAllAnswered(false);
                        setNoQuizInCategory(false);
                    }
                } catch (err) {
                    setError('Failed to load quiz questions.');
                    console.error("Error fetching quiz questions", err);
                }
            };

            fetchQuestions();
        }
    }, [userData, category]);

    return { quiz, allAnswered, noQuizInCategory, error };
};

export const deleteUser = async (userId, userLogoutHandler) => {
    try {
        const response = await request.delete(`${baseUrl}/${userId}`);
        const data = await response;

        if (data.message === 'User deleted successfully') {
            userLogoutHandler();
            return true;
        } else {
            throw new Error('Failed to delete user');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};