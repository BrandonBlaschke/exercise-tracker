import express from 'express';
import userRouter from './routers/user_router';
import mongoose from 'mongoose';

const dbURL = "mongodb://127.0.0.1:27017/exercise-tracker-test";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const app = express()

// Middleware for express example
// app.use((req, res, next) => {
//     console.log(req.method, req.path)

//     // Call next for the correct router to be called and finsh request
//     next()
// })

// Automatically parse JSON to object on req.body
app.use(express.json())

// Add routers to project 
app.use(userRouter)

app.get("/", function (req: any, res: any) {
    res.send("Hello World!");
    });

export default app;
