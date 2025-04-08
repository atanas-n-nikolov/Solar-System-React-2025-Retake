import { useState } from "react";
import { useNotificationContext } from "../../../../../context/NotificationContext";
import { addCommentToPlanet } from "../../../../../api/planetsAPI";
import style from './CommentForm.module.css';

export function CommentForm({ planetId, updatePlanetComments, disabled, closeForm }) {
    const [comment, setComment] = useState('');
    const { showNotification } = useNotificationContext();

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const updated = await addCommentToPlanet(planetId, comment);
            updatePlanetComments(updated.comments);
            setComment('');
            showNotification("Comment added successfully", 'success');
        } catch (err) {
            showNotification("Failed to post comment", 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <textarea
                value={comment}
                onChange={handleChange}
                placeholder="Add a comment..."
                rows="4"
                disabled={disabled}
            />
            <button className={style.formBtn} type="submit" disabled={disabled}>
                Submit
            </button>
        </form>
    );
}
