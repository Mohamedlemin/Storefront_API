import { orders } from "../../models/orders";
//@ts-ignore
import client from "../../database/client";

export class extra_queries {
  // Current Order by user
  async current_order(id: Number,status:string): Promise<orders[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE fk_user_id = ($1) AND status = ($2);";
      const result = await conn.query(sql, [id,status]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  // // complete Order by user
  // async complete_order(id: string): Promise<orders[]> {
  //   try {
  //     //@ts-ignore
  //     const conn = await client.connect();
  //     const sql =
  //       "SELECT * FROM orders WHERE fk_user_id = ($1) AND status = 'completed';";
  //     const result = await conn.query(sql, [id]);
  //     conn.release();

  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`Could not get orders. Error: ${error}`);
  //   }
  // }
}
