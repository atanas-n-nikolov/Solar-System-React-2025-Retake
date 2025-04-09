import { Router } from 'express';
import Facts from '../models/Facts.js';
import catchError from '../util/catchError.js';
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js';

const factsControler = Router();

factsControler.get('/fact', async (req, res) => {
    try {
        const currentDate = new Date().toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });

        const fact = await Facts.findOne({ date: currentDate });

        if (!fact) {
            return res.status(200).json({});
        };

        res.status(200).json(fact);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    };
});

factsControler.post('/fact/create', isAdmin, isAuth, async (req, res) => {
    const { title, date, year, description } = req.body;
    const ownerId = req.user._id;

    if (!title || !date || !year || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    };

    try {
        const fact = await Facts.create({ title, date, year, description, ownerId });
        res.status(201).json(fact);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

export default factsControler;