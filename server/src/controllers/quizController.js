import { Router } from 'express';
import Quiz from '../models/Quiz.js';

const quizController = Router();

quizController.get('/quiz', async (req, res) => {
    try {
        const quiz = await Quiz.find();

        if (quiz.length === 0) {
            return res.status(200).json([]);
        };

        res.status(200).json(quiz);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }; 
});

quizController.get('/quiz/latest', async (req, res) => {
    try {
        const quiz = await Quiz.findOne().sort({ createdOn: -1 }).limit(1);

        if (quiz.length === 0) {
            return res.status(200).json([]);
        };

        res.status(200).json(quiz);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

export default quizController;