import { Router } from 'express';
import Quiz from '../models/Quiz.js';
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
import catchError from '../util/catchError.js';

const quizController = Router();

quizController.get('/quiz', isAuth, async (req, res) => {
    try {
        const categoriesSummary = await Quiz.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    count: 1
                }
            },
            {
                $sort: { category: 1 }
            }
        ]);

        res.status(200).json(categoriesSummary);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    };
});

quizController.post('/quiz/create', isAdmin, isAuth, async (req, res) => {
    const { title, category, options, correctAnswer } = req.body;
    const ownerId = req.user._id;

    const optionsArray = options.split(',').map(option => option.trim());

    if (!title || !category || !optionsArray || !correctAnswer) {
        return res.status(400).json({ message: 'All fields are required.' });
    };

    if (optionsArray.length < 2) {
        return res.status(400).json({ message: 'Must have at least 2 options for answer.' });
    }

    if (!optionsArray.includes(correctAnswer)) {
        return res.status(400).json({ message: 'The correct answer must be one of the options.' });
    }

    try {
        const quiz = await Quiz.create({ title, category, options: optionsArray, correctAnswer, ownerId });
        res.status(201).json(quiz);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

quizController.get('/quiz/latest', async (req, res) => {
    try {
        const quiz = await Quiz.findOne().sort({ createdAt: -1 }).limit(1);

        if(!quiz) {
            return res.status(200).json({});
        };
        console.log(quiz);
        
        res.status(200).json(quiz);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    }
});

quizController.get("/quiz/:category", isAuth, async (req, res) => {
    try {
        const category = req.params.category;
        const userId = req.user._id;

        const unansweredQuestions = await Quiz.aggregate([
            {
                $match: { category }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'answers.questionId',
                    as: 'userAnswers'
                }
            },
            {
                $match: {
                    'userAnswers': { $size: 0 }
                }
            }
        ]);

        res.json(unansweredQuestions);
    } catch (err) {
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});

export default quizController;