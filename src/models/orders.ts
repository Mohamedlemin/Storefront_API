//@ts-ignore
import client from "../database/client";
export type orders = {
  order_id?: Number;
  fk_user_id: Number;
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
        "INSERT INTO orders (fk_user_id,status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        order.fk_user_id,
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



  //----------------- add to cart -----------------------


  async addProduct(quantity: number, orderId: string, productId: string): Promise<orders> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, fk_product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn
          .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}
