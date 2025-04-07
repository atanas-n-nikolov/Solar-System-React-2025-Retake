import { useContext, useEffect, useState } from "react";
import request from "./request";
import { UserContext } from "../context/UserContext";

const baseUrl = 'http://localhost:3000';

export const useRegister = () => {
    const register = (firstName, lastName, email, password, rePassword) => request.post(`${baseUrl}/register`, { firstName, lastName, email, password, rePassword });

    return {
        register,
    };
};

export const useLogin = () => {
    const login = async (email, password) => {
        try {
            const response = await request.post(`${baseUrl}/login`, { email, password });
            return response;
        } catch (error) {
            const errorMessage = error.message || "Login failed";
            throw new Error(errorMessage);
        };
    };

    return {
        login
    };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const logoutUser = async () => {
            setIsLoggingOut(true);

            const options = {
                headers: {
                    'X-Authorization': accessToken,
                },
            };

            try {
                await userLogoutHandler();
            } catch (err) {
                setError("Logout failed. Please try again later.");
                console.error("Logout failed", err);
            } finally {
                setIsLoggingOut(false);
            }
        };

        logoutUser();
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggingOut,
        error,
    };
};