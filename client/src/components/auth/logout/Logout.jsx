import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useNotificationContext } from "../../../context/NotificationContext";
import { useLogout } from "../../../api/authAPI";
import ErrorNotification from "../../error/ErrorNotification";

export default function Logout() {
    const { isLoggingOut, error } = useLogout();
    const { showNotification } = useNotificationContext();

    useEffect(() => {
    }, []);

    if (error) {
        showNotification(error, 'error');
        return <ErrorNotification />;
    }

    if (isLoggingOut) {
        return <p>Logging out...</p>;
    }

    return <Navigate to="/" />;
}
