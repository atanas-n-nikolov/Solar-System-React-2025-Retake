import { useEffect, useState } from 'react';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import styles from '../fact/CreateFact.module.css';
import { useNavigate } from 'react-router';
import { useDeletePlanet, usePlanets, useUpdatePlanet } from '../../../../../api/planetsAPI';

const initialState = {
    name: '',
    type: '',
    image: '',
    distanceToSun: '',
    size: '',
    description: '',
};

export default function EditPlanet() {
    const { showNotification } = useNotificationContext();
    const { planets } = usePlanets();
    const { deletePlanet } = useDeletePlanet();
    const { updatePlanet } = useUpdatePlanet();
    const [planetData, setPlanetData] = useState(initialState);
    const [selectedPlanetId, setSelectedPlanetId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedPlanetId && planets) {
            const selectedFact = planets.find(planet => planet._id === selectedPlanetId);
            if (selectedFact) {
                setPlanetData(selectedFact);
            };
        }
    }, [selectedPlanetId, planets]);

    const handleChange = (e) => {
        setPlanetData({
            ...planetData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!planetData.name.trim() || !planetData.type.trim() || !planetData.image.trim() || !planetData.distanceToSun.trim() || !planetData.size.trim() || !planetData.description.trim()) {
            return showNotification("All fields are required.", "error");
        };

        const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
        if (!urlRegex.test(planetData.image)) {
            return showNotification("Please enter a valid image URL starting with http:// or https://", "error");
        }

        setIsSubmitting(true);
        try {
            await updatePlanet(selectedPlanetId, planetData);
            showNotification("Fact updated successfully!", "success");
            setIsEditing(false);
            navigate('/admin-dashboard');
        } catch (err) {
            showNotification("Failed to update fact. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);

        try {
            await deletePlanet(selectedPlanetId);

            showNotification("Fact deleted successfully!", "success");

            setIsEditing(false);
            setSelectedPlanetId(null);

            navigate('/admin-dashboard')
        } catch (err) {

            showNotification("Failed to delete fact. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        };
    };


    const handleCancel = () => {
        setIsEditing(false);
        setSelectedPlanetId(null);
    };

    const handleSelectChange = (e) => {
        const planetId = e.target.value;
        setSelectedPlanetId(planetId);
        setIsEditing(true);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit Planet</h2>
            {!isEditing ? (
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="planetSelect">Select Fact:</label>
                        <select
                            id="planetSelect"
                            name="planetSelect"
                            value={selectedPlanetId || ''}
                            onChange={handleSelectChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Select a planet</option>
                            {planets && planets.length > 0 ? (
                                planets.map((planet) => (
                                    <option key={planet._id} value={planet._id}>
                                        {planet.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No planets available</option>
                            )}
                        </select>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={planetData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="type">Type (Star, Planet):</label>
                        <select
                            id="type"
                            name="type"
                            value={planetData.type}
                            onChange={handleChange}
                        >
                            <option value="">Select a type</option>
                            <option value="Star">Star</option>
                            <option value="Planet">Planet</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="image">Image url:</label>
                        <textarea
                            id="image"
                            name="image"
                            value={planetData.image}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="distanceToSun">Distance to Sun:</label>
                        <textarea
                            id="distanceToSun"
                            name="distanceToSun"
                            value={planetData.distanceToSun}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="size">Size:</label>
                        <textarea
                            id="size"
                            name="size"
                            value={planetData.size}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={planetData.description}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formButtons}>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Planet'}
                        </button>
                        <button type="button" onClick={handleDelete} disabled={isSubmitting}>
                            Delete Planet
                        </button>
                        <button type="button" onClick={handleCancel} disabled={isSubmitting}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}



