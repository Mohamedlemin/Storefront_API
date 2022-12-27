import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, userStore } from "../models/user";
import verifyToken from "../middlewares/verifyToken";

import dotenv from "dotenv";
const user_route = express.Router();
const store = new userStore();

dotenv.config();
const secret_token = process.env.TOKEN as string;

//----------------- index -----------------------

user_route.get("/users",verifyToken, async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(404);
    res.json(error);
    console.log(error);
  }
});

//----------------- create -----------------------
user_route.post("/user",verifyToken, async (_req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: _req.body.firstName,
      lastName: _req.body.lastName,
      password: _req.body.password,
    };
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, secret_token);
    res.json(token);
  } catch (error) {
    res.status(502);
    console.log(error);
    res.json(error);
  }
});

// ----------------- show -------------------------
user_route.get(
  "/user/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const user = await store.show(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404);
      res.json(error);
    }
  }
);

// ----------------- delete -------------------------

user_route.delete("/user/:id",verifyToken, async (req: Request, res: Response) => {
  try {
    const delete_user = await store.delete(req.params.id);
    res.json(delete_user);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
});
// ----------------- Auth -------------------------

user_route.post('/user/auth',async (_req:Request , res: Response)=>{
  try {
      const user = {
        firstName: _req.body.firstName,
        password : _req.body.password
      }
      const auth = await store.authenticate(user.firstName,user.password);
      if (auth?.password!=null) {
        var token = jwt.sign({ user: auth }, secret_token);
        res.json(token)

      }else{
        res.send('Invalid password')
      }
  } catch (error) {
      res.status(502)
      console.log(error)
      
  }
})

export default user_route;
