import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "evergreen",
  database: "self_scribe",
  password: "DBpw",
  port: 5432,
  host: "localhost",
});
