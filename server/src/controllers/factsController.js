import { Router } from 'express';
import Facts from '../models/Facts.js';
import catchError from '../util/catchError.js';

const factsControler = Router();

factsControler.get('/fact', async (req, res) => {
    try {
        const currentDate = new Date().toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });

        const fact = await Facts.findOne({ date: currentDate });

        if (!fact) {
            return res.status(200).json([]);
        };

        res.status(200).json(fact);
    } catch (error) {
        const errorMessage = catchError(error);
        res.status(500).json({ message: errorMessage });
    };
});

export default factsControler;