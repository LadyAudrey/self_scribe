// automagically runs config as a function bc of the "" formatting
import "dotenv/config";

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
