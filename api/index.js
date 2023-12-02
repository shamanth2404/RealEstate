import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

mongoose.connect("mongodb+srv://shamanthk2404:Shamanth24@realestate.qpixd16.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(3000,()=>{
    console.log('server running in 3000');
});

app.get("/api/user", userRouter);