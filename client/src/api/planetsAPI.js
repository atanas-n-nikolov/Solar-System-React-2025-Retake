import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3000/planets';

export const usePlanets = () => {
    const [planets, setPlanets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await request.get(`${baseUrl}`);
                setPlanets(response);
            } catch (error) {
                setError('Failed to load planets. Please try again later.');
            }
        };

        fetchPlanets();
    }, []);

    return { planets, error };
};

export const usePlanet = (planetId) => {
    const [planet, setPlanet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const response = await request.get(`${baseUrl}/${planetId}`);
                setPlanet(response);
            } catch (error) {
                setError('Failed to load planet details.');
                console.error('Error fetching planet details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanet();
    }, [planetId]);

    return { planet, setPlanet, loading, error };
};

export const addCommentToPlanet = async (planetId, commentText) => {
    try {
        const response = await request.post(`${baseUrl}/${planetId}/comment`, {
            text: commentText
        });

        return response;
    } catch (err) {
        console.error('Failed to add comment:', err);
        throw new Error('Failed to add comment');
    }
};

export const deleteCommentFromPlanet = async (planetId, commentId) => {
    try {
        const response = await request.delete(`${baseUrl}/${planetId}/comments/${commentId}`);

        const data = await response;

        if (data.message === 'Comment deleted successfully') {
            return true;
        } else {
            throw new Error('Failed to delete comment');
        }
    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
};
