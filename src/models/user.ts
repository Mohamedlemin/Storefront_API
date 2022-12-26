import  bcrypt  from "bcrypt";
import dotenv from 'dotenv'
 // @ts-ignore
import client from "../database/client";


export type User = {
    id?: Number,
    firstName :string,
    lastName:string,
    password :string
}
dotenv.config()
const {
    BCRYPT_PASSWORD,
    SALT_ROUND

} = process.env

export class userStore {

    async index(): Promise<User[]> {
        try {
          const sql = 'SELECT * FROM users'
          const conn = await client.connect()
         
          const result = await conn.query(sql)
          conn.release()
      
          return result.rows 
        } catch (err) {
            throw new Error(`Could not get the user. Error: ${err}`)
            
        }
       }
       
    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
      
        const result = await conn.query(sql, [id])
      
        conn.release()
      
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
       }

    async create(u: User): Promise<User> {
        try {
          // @ts-ignore
          const conn = await client.connect()
          const sql = 'INSERT INTO users (firstName,lastName,password) VALUES($1, $2 ,$3) RETURNING *'
    
          const hash = bcrypt.hashSync(
            u.password + BCRYPT_PASSWORD, 
            // @ts-ignore
            parseInt(SALT_ROUND)
          );
    
          const result = await conn.query(sql, [u.firstName,u.lastName, hash])
          const user = result.rows[0]
    
          conn.release()
  
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.firstName}): ${err}`)
        } 
      }
}

