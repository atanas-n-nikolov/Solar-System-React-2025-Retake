import { useEffect, useState } from 'react';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import styles from '../fact/CreateFact.module.css';
import { useNavigate } from 'react-router';
import { useAllQuiz, useDeleteQuiz, useUpdateQuiz } from '../../../../../api/quizAPI';

const initialState = {
    title: '',
    category: '',
    options: [],
    correctAnswer: '',
};

export default function EditQuiz() {
    const { showNotification } = useNotificationContext();
    const { quiz } = useAllQuiz();
    const [quizData, setQuizData] = useState(initialState);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const { updateQuiz } = useUpdateQuiz();
    const { deleteQuiz } = useDeleteQuiz();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedQuizId && quiz) {
            const selectedQuiz = quiz.find(q => q._id === selectedQuizId);
            if (selectedQuiz) {
                setQuizData(selectedQuiz);
            };
        }
    }, [selectedQuizId, quiz]);

    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!quizData.title.trim() || !quizData.category.trim() || quizData.options.length < 2 || quizData.options.some(option => !option.trim()) || !quizData.correctAnswer.trim()) {
            return showNotification("All fields are required, and options must have at least 2 valid answers.", "error");
        };

        setIsSubmitting(true);
        try {
            await updateQuiz(selectedQuizId, quizData);
            showNotification("Quiz updated successfully!", "success");
            setIsEditing(false);
            navigate('/admin-dashboard');
        } catch (err) {
            showNotification("Failed to update quiz. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);

        try {
            await deleteQuiz(selectedQuizId);

            showNotification("Quiz deleted successfully!", "success");

            setIsEditing(false);
            setSelectedQuizId(null);

            navigate('/admin-dashboard')
        } catch (err) {

            showNotification("Failed to delete quiz. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        };
    };


    const handleCancel = () => {
        setIsEditing(false);
        setSelectedQuizId(null);
    };

    const handleSelectChange = (e) => {
        const quizId = e.target.value;
        setSelectedQuizId(quizId);
        setIsEditing(true);
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit Quiz</h2>
            {!isEditing ? (
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="quizSelect">Select Quiz:</label>
                        <select
                            id="quizSelect"
                            name="quizSelect"
                            value={selectedQuizId || ''}
                            onChange={handleSelectChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Select a quiz</option>
                            {quiz && quiz.length > 0 ? (
                                quiz.map((q) => (
                                    <option key={q._id} value={q._id}>
                                        {q.title}
                                    </option>
                                ))
                            ) : (
                                <option value="">No quiz available</option>
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
                            value={quizData.title}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="type">Category (beginner, intermediate, advanced, expert):</label>
                        <select
                            id="category"
                            name="category"
                            value={quizData.category}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Select a type</option>
                            <option value="beginner">beginner</option>
                            <option value="intermediate">intermediate</option>
                            <option value="advanced">advanced</option>
                            <option value="expert">expert</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="options">Options (at least two answers):</label>
                        <textarea
                            id="options"
                            name="options"
                            value={quizData.options}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="correctAnswer">Correct answer:</label>
                        <textarea
                            id="correctAnswer"
                            name="correctAnswer"
                            value={quizData.correctAnswer}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className={styles.formButtons}>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Quiz'}
                        </button>
                        <button type="button" onClick={handleDelete} disabled={isSubmitting}>
                            Delete Quiz
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



