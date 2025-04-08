import { useEffect, useState } from "react";
import request from './request.js';

const baseUrl = 'http://localhost:3000/planets';

export const usePlanets = () => {
    const [planets, setPlanets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await request.get(baseUrl);
                setPlanets(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to load planets. Please try again later.');
                setLoading(false);
            };
        };

        fetchPlanets();
    }, []);

    return { planets, error, loading };
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
            } finally {
                setLoading(false);
            };
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
        const response = await request.delete(`${baseUrl}/${planetId}/comment/${commentId}`);
        
        const data = await response;

        if (data.message === 'Comment deleted successfully') {
            return data.planet.comments;
        } else {
            throw new Error('Failed to delete comment');
        };

    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    };
};

export const editCommentInPlanet = async (planetId, commentId, newCommentText) => {
    try {
        const response = await request.put(`${baseUrl}/${planetId}/comment/${commentId}`, {
            text: newCommentText,
        });

        const data = await response;

        if (data.message === 'Comment updated successfully') {
            return data.planet;
        } else {
            throw new Error('Failed to update comment');
        }
    } catch (err) {
        console.error('Error updating comment:', err);
        throw err;
    }
};
