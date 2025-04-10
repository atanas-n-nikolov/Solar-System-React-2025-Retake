import { useContext, useEffect, useState } from "react";
import request from "./request";
import { UserContext } from "../context/UserContext";

const baseUrl = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:3000';
  
export const useRegister = () => {
    const register = async (firstName, lastName, email, password, rePassword) => {
        try {
            const response = await request.post(`${baseUrl}/register`, { firstName, lastName, email, password, rePassword });
            return response;
        } catch (error) {
            const errorMessage = error.message || "Register failed";
            throw new Error(errorMessage);
        };
    };

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
            } catch (error) {
                const errorMessage = error.message || "Logout failed, please try again later.";
                throw new Error(errorMessage);
            } finally {
                setIsLoggingOut(false);
            }
        };

        logoutUser();
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggingOut,
    };
};