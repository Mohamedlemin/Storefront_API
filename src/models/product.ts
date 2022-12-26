import client from "../database/client"
export type product = {
    id?: Number
    name:string
    price:Number
    category:string
}

export class productStore {

   async index(): Promise<product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM product'
      const result = await conn.query(sql)
      conn.release()
  
      return result.rows 
    } catch (err) {
        throw new Error(`Could not get product. Error: ${err}`)
        
    }
   }
   async show(id: string): Promise<product> {
    try {
    const sql = 'SELECT * FROM product WHERE id=($1)'
    const conn = await client.connect()
  
    const result = await conn.query(sql, [id])
  
    conn.release()
  
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
   }
  async create(p: product): Promise<product> {
    try {
  const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
  // @ts-ignore
  const conn = await client.connect()

  const result = await conn
      .query(sql, [p.name,p.price,p.price])

  const book = result.rows[0]

  conn.release()

  return book
    } catch (err) {
        throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
    }
   }

}