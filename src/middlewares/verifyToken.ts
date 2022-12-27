import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret_token = process.env.TOKEN as string;

const verifyToken = (req: Request, res: Response, next: Function) => {
  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }else{
  try {
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret_token);
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Access denied, Invalid token' });
  }
}
};

export default verifyToken;
