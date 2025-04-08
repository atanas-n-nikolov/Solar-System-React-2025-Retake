import { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { fetchUserProfileData } from "../api/userAPI";

const useUserProfile = (userId) => {
    const { showNotification } = useNotificationContext();
    const [userData, setUserData] = useState(null);
    const [comments, setComments] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { userData, comments, answers } = await fetchUserProfileData(userId, showNotification);
                setUserData(userData);
                setComments(comments);
                setAnswers(answers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        } else {
            setError("Invalid user ID");
            setLoading(false);
        }
    }, [userId, showNotification]);

    return { userData, comments, answers, loading, error };
};

export default useUserProfile;
