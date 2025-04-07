import React, { createContext, useContext } from 'react';

export const NotificationContext = createContext({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {},
});

export function useNotificationContext() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }
    return context;
}
