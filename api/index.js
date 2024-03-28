import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect("mongodb+srv://shamanthk2404:Shamanthk2404@cluster0.bgsebd6.mongodb.net/realEstate?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log('connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.listen(3000,()=>{
    console.log('server running in 3000');
});

app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});