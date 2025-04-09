import React, { useState } from "react";
import styles from '../fact/CreateFact.module.css';
import { useAddQuiz } from "../../../../../api/quizAPI";
import { useNavigate } from "react-router";

export default function CreateQuiz() {
    const { addQuiz, loading, error, success } = useAddQuiz();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        title: "",
        category: "",
        options: "",
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
        addQuiz(quizData);
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
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={quizData.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="options">Options (comma separated):</label>
                    <input
                        type="text"
                        id="options"
                        name="options"
                        value={quizData.options}
                        onChange={handleInputChange}
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
