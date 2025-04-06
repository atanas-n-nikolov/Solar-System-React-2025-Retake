import React from 'react';
import style from './ErrorNotification.module.css';

export default function ErrorNotification ({ message, type = 'error' }) {
    if (!message) return null;

    const errorClass = type === 'error' ? 'error' : 'success';

    return (
        <div className={`${style.errorNotification} ${errorClass}`}>
            <p>{message}</p>
        </div>
    );
};

