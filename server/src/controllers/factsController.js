import { Router } from 'express';
import Facts from '../models/Facts.js';
import catchError from '../util/catchError.js';
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js';

const factsControler = Router();

factsControler.get('/fact/all', isAuth, isAdmin, async (req, res) => {
    try {
        const facts = await Facts.find();

        if(!facts) {
            return res.status(200).json([]);
        };

        res.status(200).json(facts);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    };
});

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

factsControler.put('/fact/edit', isAdmin, isAuth, async (req, res) => {
    const { date, year, title, description, factId} = req.body;
    const ownerId = req.user._id;
    
    if(!date || !year || !title || !description || !ownerId) {
        return res.status(400).json({ message: 'All fields are required.' });
    };

    try {
        const fact = await Facts.findByIdAndUpdate(factId, { title, date, year, description, ownerId }, { new: true });
        res.status(201).json(fact);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
    };
});

factsControler.delete('/fact/delete', isAdmin, isAuth, async (req, res) => {
    const { factId } = req.body.data;

    try {
        const fact = await Facts.findByIdAndDelete(factId);
        res.status(201).json([]);
    } catch (error) {
        const errorMessage = catchError(error)
        res.status(400).json({ message: errorMessage });
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