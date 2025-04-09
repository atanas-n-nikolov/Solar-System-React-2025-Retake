import { useState } from "react";
import styles from './CreateFact.module.css';
import { useAddFact } from "../../../../../api/factsAPI";
import { useNavigate } from "react-router";

export default function CreateFact() {
    const { addFact, loading, error, success } = useAddFact();
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
        addFact(factData);
        navigate(-1);
    };

    return (
        <div className={styles.formContainer}>
            {error && <p>{error}</p>}
            {success && <p>Fact created successfully!</p>}
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
