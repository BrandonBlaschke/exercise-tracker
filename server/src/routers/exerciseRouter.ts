import Exercise from '../models/exerciseModel';
import auth from '../middleware/authMiddleware';
import express from 'express';

const exerciseRouter = express.Router();

// POST Create exercise
/** Expects JSON data
 * id: String, id of exercise
 * name: String, name of exercise
 * dataPoint: DataPoint object to be updated to
 * unit: String, unit of dataPoint
 */
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

// POST Add Data Point
/** Expects these JSON values 
 * _id: id of the exercise
 * date: Number: Date integer
 * data: Number: Data for data point
 * notes: String, notes to add with data point.
 */
exerciseRouter.post('/exercise/addData', auth, async (req: any, res: any) => {
    try {
        const exercise = await Exercise.findOne({"_id": req.body._id, "owner": req.user._id})

        if (!exercise) {
            res.status(401).send();
        }

        await exercise?.addDataPoint(new Date(req.body.date), req.body.data, req.body.notes);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

// DELETE Data Point
// Query parameter id, represents id of exercise.
exerciseRouter.delete('/exercise', auth, async (req: any, res: any) => {
    try {
        const exercise = await Exercise.findOne({"_id": req.query.id, "owner": req.user._id})

        if (!exercise) {
            res.status(401).send();
        }

        await exercise?.deleteDataPoint(req.query.dataPointID);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

exerciseRouter.delete('/exercise/:id', auth, async (req: any, res: any) => {
    try {
        const exercise = await Exercise.deleteOne({"_id": req.params.id, "owner": req.user._id})

        if (!exercise) {
            res.status(401).send();
        }

        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

// GET Specific exercise
// id route, id of exercise
exerciseRouter.get('/exercise/:id', auth, async (req: any, res: any) => {
    try {
        const exercises = await Exercise.findOne({"_id": req.params.id, "owner": req.user._id});
        if (!exercises) {
            res.status(401).send();
        }
        res.status(200).send(JSON.stringify(exercises));
    } catch (e) {
        res.status(400).send();
    }
})

// GET All Exercises
exerciseRouter.get('/exercise', auth, async (req: any, res: any) => {
    try {
        const exercises = await Exercise.find({"owner": req.user._id});

        if (!exercises) {
            res.status(401).send();
        }
        res.status(200).send(JSON.stringify(exercises));
    } catch (e) {
        res.status(400).send();
    }
})

// PATCH Update Exercise
/** Expects JSON data
 * _id: String, id of exercise
 * name: String, name of exercise
 * dataPoint: DataPoint object to be updated to
 * index: Number, index of dataPoint in array.
 */
exerciseRouter.patch('/exercise', auth, async (req: any, res: any) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['_id', 'name', 'unit', 'dataPoint', 'index'];
        const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update));

        // Check to make sure update has the property needed to update
        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid updates"});
        }

        const exercise = await Exercise.findOne({"_id": req.body._id, "owner": req.user._id});

        if (!exercise) {
            res.status(400).send()
        }
        
        exercise?.updateDataPoint(req.body.name, req.body.dataPoint, req.body.unit);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
})

export default exerciseRouter;