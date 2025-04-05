import { getAccessToken } from "./authUtil";

async function request(method, url, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const { accessToken } = getAccessToken();

    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const { message, error } = await response.json();
            const errorMessage = error || message || "Request failed";

            if (response.status !== 400 && response.status !== 404) {
                console.error('Unexpected error:', errorMessage);
            }

            throw new Error(errorMessage);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message || 'Request failed');
    }
};

export default {
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    patch: request.bind(null, "PATCH"),
    delete: request.bind(null, "DELETE"),
};