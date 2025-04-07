import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import style from './Comment.module.css';

export function Comment({ comment, onDelete, isUserComment, editCommentId, onEdit, onCancel, onEditSubmit, editText, setEditText }) {
    const handleEditClick = () => {
        onEdit(comment._id, comment.text);
    };

    const handleTextChange = (e) => {
        setEditText(e.target.value);
    };

    const handleSaveClick = () => {
        onEditSubmit();
    };

    const handleCancelClick = () => {
        onCancel();
    };

    return (
        <div className={style.comment}>
            <p>
                <strong>{comment.user.firstName} {comment.user.lastName}</strong>:
                {editCommentId === comment._id ? (
                    <textarea
                        value={editText}
                        onChange={handleTextChange}
                        rows="3"
                        className={style.editTextArea}
                    />
                ) : (
                    comment.text
                )}
            </p>
            {isUserComment && (
                <div className={style.buttons}>
                    {editCommentId !== comment._id ? (
                        <>
                            <button onClick={() => onDelete(comment._id)}>
                                <FaTrash />
                            </button>

                            <button onClick={handleEditClick}>
                                <FaEdit />
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSaveClick}>
                                <FaCheck />
                            </button>
                            <button onClick={handleCancelClick}>
                                <FaTimes />
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}





{/* 

<p className={style.date}>
    {new Date(comment.createdAt).toISOString().slice(0, 19) === new Date(comment.updatedAt).toISOString().slice(0, 19)
        ? <em>{new Date(comment.createdAt).toLocaleString()}</em>
        : <><em>{`${new Date(comment.createdAt).toLocaleString()} (created)`}</em>
            <em>{`${new Date(comment.updatedAt).toLocaleString()} (updated)`}</em>
        </>
    }
</p>

</div> */}