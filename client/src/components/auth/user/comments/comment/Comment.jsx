import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import useAuth from '../../../../../hooks/useAuth';
import { deleteCommentFromPlanet, editCommentInPlanet } from '../../../../../api/planetsAPI';
import style from './Comment.module.css';

export function Comment({ planetId, comment, updatePlanetComments }) {
    const { _id: userId } = useAuth();
    const { showNotification } = useNotificationContext();
    const [isEditing, setIsEditing] = useState(false);
    const [pending, setPending] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);

    const isOwner = userId === comment.user._id;

    const handleDelete = async () => {
        try {
            const updatedComments = await deleteCommentFromPlanet(planetId, comment._id);
            updatePlanetComments(updatedComments);
            showNotification("Comment deleted", 'success');
        } catch (err) {
            showNotification("Failed to delete comment", 'error');
        }
    };

    const handleEditSubmit = async () => {
        if (!editedText.trim()) return showNotification("Comment cannot be empty", 'error');

        try {
            setPending(true);
            const updated = await editCommentInPlanet(planetId, comment._id, editedText);
            updatePlanetComments(updated.comments);
            setIsEditing(false);
            showNotification("Comment updated", 'success');
        } catch (err) {
            showNotification("Failed to update comment", 'error');
        } finally {
            setPending(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedText(comment.text);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        handleEditSubmit();
    };

    const handleCancelClick = () => {
        handleCancelEdit();
    };

    const created = new Date(comment.createdAt);
    const updated = new Date(comment.updatedAt);
    const isEdited = created.toISOString() !== updated.toISOString();

    return (
        <div className={style.comment}>
            <p>
                <strong>{comment.user.firstName} {comment.user.lastName}</strong>:
            </p>
            {isEditing ? (
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows="3"
                        className={style.editTextArea}
                    />
                ) : (
                    comment.text
                )}

            <p className={style.date}>
                <em>{created.toLocaleString()} (created)</em>
                {isEdited && <em> | {updated.toLocaleString()} (updated)</em>}
            </p>

            {isOwner && (
                <div className={style.buttons}>
                    {!isEditing ? (
                        <>
                            <button onClick={handleDelete} title="Delete"><FaTrash /></button>
                            <button onClick={handleEditClick} title="Edit"><FaEdit /></button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSaveClick} disabled={pending} title="Save">
                                <FaCheck />
                            </button>
                            <button onClick={handleCancelClick} disabled={pending} title="Cancel">
                                <FaTimes />
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
