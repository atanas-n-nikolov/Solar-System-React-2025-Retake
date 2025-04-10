import { useEffect, useState } from 'react';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { useAllFact, useDeleteFact, useUpdateFact } from '../../../../../api/factsAPI';
import styles from './CreateFact.module.css';
import { useNavigate } from 'react-router';

const initialState = {
    title: '',
    date: '',
    year: '',
    description: '',
};

export default function EditFact() {
    const { facts, error, loading } = useAllFact();
    const { updateFact } = useUpdateFact();
    const { deleteFact } = useDeleteFact();
    const { showNotification } = useNotificationContext();
    const [factData, setFactData] = useState(initialState);
    const [selectedFactId, setSelectedFactId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedFactId && facts) {
            const selectedFact = facts.find(fact => fact._id === selectedFactId);
            if (selectedFact) {
                setFactData(selectedFact);
            };
        }
    }, [selectedFactId, facts]);

    const handleChange = (e) => {
        setFactData({
            ...factData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!factData.title.trim() || !factData.date.trim() || !factData.year.trim() || !factData.description.trim()) {
            return showNotification("All fields are required.", "error");
        }

        setIsSubmitting(true);
        try {
            await updateFact(selectedFactId, factData);
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
            await deleteFact(selectedFactId);

            showNotification("Fact deleted successfully!", "success");

            setIsEditing(false);
            setSelectedFactId(null);

            navigate('/admin-dashboard')
        } catch (err) {

            showNotification("Failed to delete fact. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        };
    };


    const handleCancel = () => {
        setIsEditing(false);
        setSelectedFactId(null);
    };

    const handleSelectChange = (e) => {
        const factId = e.target.value;
        setSelectedFactId(factId);
        setIsEditing(true);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit Fact</h2>
            {!isEditing ? (
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="factSelect">Select Fact:</label>
                        <select
                            id="factSelect"
                            name="factSelect"
                            value={selectedFactId || ''}
                            onChange={handleSelectChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Select a fact</option>
                            {facts && facts.length > 0 ? (
                                facts.map((fact) => (
                                    <option key={fact._id} value={fact._id}>
                                        {fact.date}
                                    </option>
                                ))
                            ) : (
                                <option value="">No facts available</option>
                            )}
                        </select>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={factData.title}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date (dd.mm):</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={factData.date}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={factData.year}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={factData.description}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formButtons}>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Fact'}
                        </button>
                        <button type="button" onClick={handleDelete} disabled={isSubmitting}>
                            Delete Fact
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



