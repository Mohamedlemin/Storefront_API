import express , {Request ,Response} from 'express';
import jwt from 'jsonwebtoken';
import {User,userStore} from '../models/user'
import verifyToken from "../middlewares/verifyToken"


import dotenv from 'dotenv'
const user_route = express.Router()
const store = new userStore;

dotenv.config();
const secret_token = process.env.TOKEN as string

//----------------- index -----------------------

user_route.get('/users',verifyToken,async (_req: Request , res :Response)  =>  {
    try {
        const users = await store.index()
        res.status(200)
        res.json(users)
    } catch (error) {
        res.status(404)
        res.json(error);
        console.log(error)
        
    }
})

//----------------- create -----------------------
user_route.post('/user',verifyToken,async (_req:Request , res: Response)=>{
    try {
        const user:User = {
            firstName: _req.body.firstName,
            lastName : _req.body.lastName,
            password : _req.body.password
        }
        const newUser = await store.create(user);
        var token = jwt.sign({user:newUser},secret_token);
        res.json(token)
        
    } catch (error) {
        res.status(502)
        console.log(error);
        res.json(error)
        
    }
})


// ----------------- show -------------------------
user_route.get('/user/:id',verifyToken,async (req:Request , res: Response) => {
    try {
        const user = await store.show(req.params.id)
            res.json(user)
    
    } catch (error) {
        res.status(404)
        res.json(error)
    }
})


export default user_route;