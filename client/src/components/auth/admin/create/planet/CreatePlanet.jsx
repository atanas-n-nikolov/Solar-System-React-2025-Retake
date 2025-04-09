import React, { useState } from "react";
import styles from '../fact/CreateFact.module.css';
import { useAddPlanet } from "../../../../../api/planetsAPI";
import { useNavigate } from "react-router";
import { useNotificationContext } from "../../../../../context/NotificationContext";

export default function CreatePlanet() {
    const { addPlanet, loading, error, success } = useAddPlanet();
    const { showNotification } = useNotificationContext();
    const navigate = useNavigate();
    const [planetData, setPlanetData] = useState({
        name: "",
        type: "",
        image: "",
        distanceToSun: "",
        size: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlanetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!planetData.name.trim() || !planetData.type.trim() || !planetData.image.trim() || !planetData.distanceToSun.trim() || !planetData.size.trim() || !planetData.description.trim()) {
            return showNotification("All fields are required.", "error");
        };
        
        addPlanet(planetData);
        navigate(-1);
    };

    return (
        <div className={styles.formContainer}>
            {error && <p>{error}</p>}
            {success && <p>Planet created successfully!</p>}
            <h2>Create a New Planet</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Planet Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={planetData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Planet Type:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={planetData.type}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Planet Image URL:</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={planetData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="distanceToSun">Distance to Sun:</label>
                    <input
                        type="text"
                        id="distanceToSun"
                        name="distanceToSun"
                        value={planetData.distanceToSun}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="size">Planet Size:</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        value={planetData.size}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={planetData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
