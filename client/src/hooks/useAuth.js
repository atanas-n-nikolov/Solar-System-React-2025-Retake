import { useContext } from "react";
import request from "../api/request";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
    const authData = useContext(UserContext);

    const accessToken = authData?.accessToken || localStorage.getItem('accessToken');

    const requestWrapper = (method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'Authorization': accessToken ? `Bearer ${accessToken}` : '',
                ...options.headers
            }
        };
    
        return request[method.toLowerCase()](url, data, authOptions); 
    };

    return {
        ...authData,
        userId: authData?._id || localStorage.getItem('_id'),
        role: authData?.role,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    }
};
