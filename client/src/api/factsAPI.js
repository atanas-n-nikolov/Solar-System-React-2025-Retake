import { useEffect, useState } from "react";
import request from "./request";

const baseUrl = 'http://localhost:3000/fact';

export const useFact = () => {
    const [fact, setFact] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await request.get(baseUrl);
                if (response && response._id) {
                    setFact(response);
                } else {
                    setError('No fact available for today.');
                }
                setLoading(false);
            } catch (error) {
                setError('Failed to load fact. Please try again later.');
                setLoading(false);
            }
        };

        fetchFact();
    }, []);

    return { fact, error, loading };
};
