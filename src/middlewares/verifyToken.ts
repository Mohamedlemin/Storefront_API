import express , {Request ,Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const secret_token = process.env.TOKEN as string

const verifyToken = (req: Request, res: Response, next:Function) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1] 
        const decoded = jwt.verify(token, secret_token)

        next()
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
}

export default verifyToken