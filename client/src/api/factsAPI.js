import { useEffect, useState } from "react";
import request from "./request";

console.log(import.meta.env.VITE_API_URL);

const baseUrl = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/fact` 
  : 'http://localhost:3000/fact';

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

export const useAllFact = () => {
    const [facts, setFacts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await request.get(`${baseUrl}/all`);
                if (response) {
                    setFacts(response);
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

    return { facts, error, loading };
};

export const useAddFact = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const addFact = async (factData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await request.post(`${baseUrl}/create`, factData);
            if (response && response._id) {
                setSuccess(true);
            } else {
                setError('Failed to create fact. Please try again.');
            }
        } catch (error) {
            setError('Failed to create fact. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { addFact, loading, error, success };
};

export const useUpdateFact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateFact = async (factId, factData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const dataToSend = { ...factData, factId };

        try {
            const response = await request.put(`${baseUrl}/edit`, dataToSend);
            setSuccess(true);
            console.log('Fact updated:', response);
        } catch (error) {
            setError('Failed to update fact. Please try again later.');
            console.error('Error updating fact:', error);
        } finally {
            setLoading(false);
        }
    };

    return { updateFact, loading, error, success };
};

export const useDeleteFact = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteFact = async (factId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await request.delete(`${baseUrl}/delete`, {
                data: { factId }
            });
            setSuccess(true);
            console.log('Fact deleted:', response.data);
        } catch (error) {
            setError('Failed to delete fact. Please try again later.');
            console.error('Error deleting fact:', error);
        } finally {
            setLoading(false);
        }
    };

    return { deleteFact, loading, error, success };
};