import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

const DATABASE_NAME = (
  ENV === "dev" ? POSTGRES_DB : "POSTGRES_TEST_DB"
) as string;

const client = 
    new Pool({
    host: POSTGRES_HOST,
    database: DATABASE_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });

export default client;