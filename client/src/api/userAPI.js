import { useEffect, useState } from "react";
import request from "./request";

const baseUrl = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/profile` 
  : 'http://localhost:3000/profile';

export const getUserData = (userId) => {
    return request.get(`${baseUrl}/${userId}`)
        .catch(err => {
            throw new Error(err.response?.data?.message || "Failed to fetch user data.");
        });
};

export const fetchUserProfileData = async (userId, showNotification) => {
    try {
        const response = await getUserData(userId);
        
        if (response && response.user && response.comments) {
            return {
                userData: response.user,
                comments: response.comments,
                answers: response.user.answers || [],
            };
        } else {
            throw new Error("User profile or comments not found.");
        }
    } catch (err) {
        showNotification(err.message || "Error fetching user profile and comments.", "error");
        throw new Error(err.message || "Error fetching user profile and comments.");
    }
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
                    const questionsResponse = await request.get(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/quiz/${category}` :`http://localhost:3000/quiz/${category}`);

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