import express, { Request, Response } from "express";
import { orders, ordersStore } from "../models/orders";
import verifyToken from "../middlewares/verifyToken";
import dotenv from "dotenv";
import { extra_queries } from "../database/services/extra_queries";

dotenv.config();
const store = new ordersStore();
const extra = new extra_queries();
const secret_token = process.env.TOKEN as string;
const order_route = express.Router();

//----------------- current_order -----------------------

order_route.get(
  "/orders/active/user/:id",
  verifyToken,
  async (_req: Request, res: Response) => {
    try {
      const orders = await extra.current_order(_req.params.id);
      res.status(200);
      res.json(orders);
    } catch (error) {
      res.status(404);
      res.json(error);
      console.log(error);
    }
  }
);

//----------------- complete_order -----------------------

order_route.get(
  "/orders/complete/user/:id",
  verifyToken,
  async (_req: Request, res: Response) => {
    try {
      const orders = await extra.complete_order(_req.params.id);
      res.status(200);
      res.json(orders);
    } catch (error) {
      res.status(404);
      res.json(error);
      console.log(error);
    }
  }
);

//----------------- index -----------------------

order_route.get("/orders", async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200);
    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json(error);
    console.log(error);
  }
});

// ----------------- show -------------------------
order_route.get(
  "/order/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const order = await store.show(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(404);
      res.json(error);
    }
  }
);

// ----------------- create -------------------------

order_route.post("/order", verifyToken, async (req: Request, res: Response) => {
  const order = {
    fk_user_id: req.body.fk_user_id,
    fk_product_id: req.body.fk_product_id,
    quantity: req.body.quantity,
    status: req.body.status,
  };

  try {
    const neworder = await store.create(order);
    res.json(neworder);
  } catch (error) {
    res.status(401);
    res.json(error);
    console.log(error);
  }
});

// ----------------- delete -------------------------

order_route.delete("/order/:id", async (req: Request, res: Response) => {
  try {
    const delete_order = await store.delete(req.params.id);
    res.json(delete_order);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
});

export default order_route;
