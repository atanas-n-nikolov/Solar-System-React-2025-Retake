import React, { useState } from "react";
import styles from '../fact/CreateFact.module.css';
import { useAddQuiz } from "../../../../../api/quizAPI";
import { useNavigate } from "react-router";
import { useNotificationContext } from "../../../../../context/NotificationContext";

export default function CreateQuiz() {
    const { addQuiz, loading, error, success } = useAddQuiz();
    const { showNotification } = useNotificationContext();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        title: "",
        category: "",
        options: [],
        correctAnswer: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formattedOptions = quizData.options.split(',').map(option => option.trim()).filter(option => option);
    
        if (!quizData.title.trim() || !quizData.category.trim() || formattedOptions.length < 2 || formattedOptions.some(option => !option.trim()) || !quizData.correctAnswer.trim()) {
            return showNotification("All fields are required, and options must have at least 2 valid answers.", "error");
        };

        if(!formattedOptions.includes(quizData.correctAnswer)) {
            return showNotification("The correct answer must be one of the options.", "error");
        };
    
        const quizDataToSend = {
            ...quizData,
            options: formattedOptions,
        };
    
        addQuiz(quizDataToSend);
        navigate(-1);
    };

    return (
        <div className={styles.formContainer}>
            {error && <p>{error}</p>}
            {success && <p>Planet created successfully!</p>}
            <h2>Create a New Quiz Question</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Question Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={quizData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={quizData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a type</option>
                        <option value="beginner">beginner</option>
                        <option value="intermediate">intermediate</option>
                        <option value="advanced">advanced</option>
                        <option value="expert">expert</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="options">Options (comma separated):</label>
                    <input
                        type="text"
                        id="options"
                        name="options"
                        value={quizData.options}
                        onChange={handleInputChange}
                        placeholder="Enter options separated by commas"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="correctAnswer">Correct Answer:</label>
                    <input
                        type="text"
                        id="correctAnswer"
                        name="correctAnswer"
                        value={quizData.correctAnswer}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
