export const getAccessToken = () => {
    const user = localStorage.getItem('auth');
    
    if (!user) {
        return '';
    };

    try {
        const userData = JSON.parse(user);
        return userData.accessToken || '';
    } catch (error) {
        console.error("Failed to parse auth:", error);
        return '';
    }
};