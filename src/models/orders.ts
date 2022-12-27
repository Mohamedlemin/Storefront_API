//@ts-ignore
import client from "../database/client";
export type orders = {
  order_id?: Number;
  fk_user_id: Number;
  fk_product_id: Number;
  quantity: Number;
  status: string;
};

export class ordersStore {
  //----------------- index -----------------------
  async index(): Promise<orders[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  //----------------- show -----------------------

  async show(id: string): Promise<orders> {
    try {
      const sql = "SELECT * FROM orders WHERE order_id=($1)";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find orders ${id}. Error: ${err}`);
    }
  }

  //----------------- create -----------------------

  async create(order: orders): Promise<orders> {
    try {
      const sql =
        "INSERT INTO orders (quantity, fk_user_id, fk_product_id,status) VALUES($1, $2, $3,$4) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        order.quantity,
        order.fk_user_id,
        order.fk_product_id,
        order.status,
      ]);

      const orders = result.rows[0];

      conn.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not add new orders . Error: ${err}`);
    }
  }

  //----------------- delete -----------------------

  async delete(id: string): Promise<orders> {
    try {
      const sql = "DELETE FROM orders WHERE order_id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const orders = result.rows[0];

      conn.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not delete orders ${id}. Error: ${err}`);
    }
  }
}
