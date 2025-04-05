import { Router } from "express";
import Planet from '../models/Planet.js';
import catchError from '../util/catchError.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const commentsController = Router();

commentsController.post('/planets/:planetId/comments', isAuth, async (req, res) => {
    const { planetId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);

        const newComment = {
            user: userId,
            text,
        };

        planet.comments.push(newComment);

        await planet.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(201).json(updatedPlanet);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

commentsController.delete('/planets/:planetId/comments/:commentId', isAuth, async (req, res) => {
    const { planetId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);

        const commentIndex = planet.comments.findIndex(comment => comment._id.toString() === commentId);

        planet.comments.splice(commentIndex, 1);

        await planet.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(200).json({ message: 'Comment deleted successfully' });

    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});