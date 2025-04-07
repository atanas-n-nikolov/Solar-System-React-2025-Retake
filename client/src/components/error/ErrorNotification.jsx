import React, { useContext, useEffect, useState } from 'react';
import style from './ErrorNotification.module.css';
import { NotificationContext } from '../../context/NotificationContext';

export default function ErrorNotification() {
    const { notification, hideNotification } = useContext(NotificationContext);
    const [errorClass, setErrorClass] = useState('');

    useEffect(() => {
        if (!notification) return;

        const errorClass = notification.type === 'error' ? style.error : style.success;
        setErrorClass(errorClass);

        const timer = setTimeout(() => {
            hideNotification();
        }, 5000);
    
        return () => clearTimeout(timer);
    }, [notification, hideNotification]);

    if (!notification) return null;

    const handleClose = () => {
        hideNotification();
    };

    return (
        <div className={`${style.errorNotification} ${errorClass}`}>
            <p>{notification.message}</p>
            <button className={style.closeButton} onClick={handleClose}>X</button>
        </div>
    );
}
