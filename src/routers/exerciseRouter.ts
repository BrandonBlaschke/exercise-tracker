import Exercise from '../models/exerciseModel';
import auth from '../middleware/authMiddleware';
import express from 'express';

const exerciseRouter = express.Router();

// POST Create exercise
exerciseRouter.post('/exercise', auth, async (req: any, res: any) => {
    try {
        const exercise = new Exercise({
            name: req.body.name,
            owner: req.user._id,
            unit: req.body.unit,
            dataPoints: []
        });
    
        const result = await exercise.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send();
    }
});

export default exerciseRouter;