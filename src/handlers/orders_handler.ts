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
  "/orders/user/:id/:status",
  verifyToken,
  async (_req: Request, res: Response) => {

    const userId: number = parseInt(_req.params.id)
    const status: string = _req.params.status

    try {
      const orders = await extra.current_order(userId,status);
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



order_route.post("/orders/:id/products", verifyToken, async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
    console.log(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
})
export default order_route;
