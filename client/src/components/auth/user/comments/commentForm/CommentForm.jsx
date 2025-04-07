import { useState } from "react";
import style from './CommentForm.module.css';

export function CommentForm({ onSubmit, initialValue = '', disabled }) {
    const [comment, setComment] = useState(initialValue);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={handleChange}
                placeholder="Add a comment..."
                rows="4"
            />
            <button className={style.formBtn} type="submit" disabled={disabled}>
                Submit
            </button>
        </form>
    );
}