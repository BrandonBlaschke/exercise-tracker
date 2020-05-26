import User from '../models/userModel';
import express from 'express';
import auth from '../middleware/authMiddleware';

const userRouter = express.Router();

// POST Create a user
userRouter.post('/user', async (req: any, res: any) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

// POST Log in a user
userRouter.post('/user/login', async (req: any, res: any) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

// POST Log out user
userRouter.post('/user/logout', auth, async (req: any, res: any) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

export default userRouter;