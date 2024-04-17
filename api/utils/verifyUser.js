import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies.accessToken;
    console.log(token)

    if(!token) return next(errorHandler(401,'Unauthorized'));

    jwt.verify(token,"shamanth",(err,user) => {
        if(err) return next(errorHandler(403,'Forbidden'));
        console.log(user)

        req.user = user;
        next();
    })
}