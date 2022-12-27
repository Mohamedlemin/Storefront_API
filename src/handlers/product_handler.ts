import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { productStore } from "../models/product";
import verifyToken from "../middlewares/verifyToken";
import dotenv from "dotenv";

dotenv.config();
const store = new productStore();
const secret_token = process.env.TOKEN as string;
const product_route = express.Router();

//----------------- index -----------------------

product_route.get("/products", async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200);
    res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
    console.log(error);
  }
});

// ----------------- show -------------------------
product_route.get("/product/:id", async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
});

// ----------------- create -------------------------

product_route.post(
  "/product",
  verifyToken,
  async (req: Request, res: Response) => {
    const product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    try {
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (error) {
      res.status(401);
      res.json(error);
      console.log(error);
    }
  }
);

// ----------------- delete -------------------------

product_route.delete("/product/:id", async (req: Request, res: Response) => {
  try {
    const delete_product = await store.delete(req.params.id);
    res.json(delete_product);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
});

export default product_route;
