import express from 'express';
import userRouter from './routers/user_router';
import exerciseRouter from './routers/exerciseRouter';
import mongoose from 'mongoose';
import path from 'path';

const dbURL = process.env.MONGODB_URL || "";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const app = express()

// Automatically parse JSON to object on req.body
app.use(express.json())

// Add routers to project 
app.use(userRouter);
app.use(exerciseRouter);
app.use(express.static(path.join(__dirname, "../..", "client/build")));

app.get("/test", function (req: any, res: any) {
    res.send("Hello World!2");
});

export default app;
