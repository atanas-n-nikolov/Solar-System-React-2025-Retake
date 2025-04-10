import { useState } from "react";
import styles from './CreateFact.module.css';
import { useAddFact } from "../../../../../api/factsAPI";
import { useNavigate } from "react-router";
import { useNotificationContext } from "../../../../../context/NotificationContext";

export default function CreateFact() {
    const { addFact, loading, error, success } = useAddFact();
    const { showNotification } = useNotificationContext();
    const navigate = useNavigate();

    const [factData, setFactData] = useState({
        title: "",
        date: "",
        year: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!factData.title.trim() || !factData.date.trim() || !factData.year.trim() || !factData.description.trim()) {
            return showNotification("All fields are required.", "error");
        };

        const dateRegex = /^\d{2}\.\d{2}$/;
        if (!dateRegex.test(factData.date)) {
            return showNotification("Date must be in the format dd.mm.", "error");
        };

        addFact(factData);
        navigate(-1);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Create a New Fact</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={factData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Date (dd.mm):</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={factData.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={factData.year}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={factData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading  ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
