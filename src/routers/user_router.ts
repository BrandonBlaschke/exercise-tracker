import User from '../models/userModel';
import express from 'express';

const userRouter = express.Router();

// POST Create a user
userRouter.post('/user', async (req: any, res: any) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send({user})
    } catch (e) {
        res.status(400).send(e);
    }
});

// POST Log in a user
userRouter.post('/user/login', async (req: any, res: any) => {
    return res.send("Login user")
});

// POST Log out user
userRouter.post('/user/logout', async (req: any, res: any) => {
    return res.send("Login user")
});

export default userRouter;