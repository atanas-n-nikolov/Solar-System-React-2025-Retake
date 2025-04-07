import { Router } from "express";
import Planet from '../models/Planet.js';
import User from '../models/User.js';
import catchError from '../util/catchError.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const commentsController = Router();

commentsController.post('/planets/:planetId/comment', isAuth, async (req, res) => {
    const { planetId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);
        if (!planet) return res.status(404).json({ message: 'Planet not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newComment = {
            user: userId,
            text,
            createdAt: Date.now()
        };

        planet.comments.push(newComment);
        user.comments.push(planetId);

        await planet.save();
        await user.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(201).json(updatedPlanet);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});



commentsController.delete('/planets/:planetId/comment/:commentId', isAuth, async (req, res) => {
    const { planetId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);
        const user = await User.findById(userId);

        if (!planet || !user) {
            return res.status(404).json({ message: 'Planet not found' });
        }

        const comment = planet.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        planet.comments.pull(commentId);
        user.comments.pull(planetId); 

        await planet.save();
        await user.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(200).json({ message: 'Comment deleted successfully', planet: updatedPlanet });
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});


commentsController.put('/planets/:planetId/comment/:commentId', isAuth, async (req, res) => {
    const { planetId, commentId } = req.params;
    const userId = req.user._id;
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Comment text cannot be empty' });
    }

    try {
        const planet = await Planet.findById(planetId);
        const user = await User.findById(userId);

        if (!planet || !user) {
            return res.status(404).json({ message: 'Planet not found' });
        }

        const comment = planet.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only edit your own comments' });
        }

        comment.text = text;
        comment.updatedAt = Date.now();
        await planet.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(200).json({ message: 'Comment updated successfully', planet: updatedPlanet });
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

export default commentsController;