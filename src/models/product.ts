//@ts-ignore
import client from "../database/client";

export type product = {
  id?: Number;
  name: string;
  price: Number;
  category: string;
};

export class productStore {
  //----------------- index -----------------------
  async index(): Promise<product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM product";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }
  //----------------- show -----------------------

  async show(id: string): Promise<product> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  //----------------- create -----------------------

  async create(p: product): Promise<product> {
    try {
      const sql =
        "INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  //----------------- delete -----------------------

  async delete(id: string): Promise<product> {
    try {
      const sql = "DELETE FROM product WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
