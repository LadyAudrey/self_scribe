const { Pool } = require("pg");

const pool = new Pool({
  user: "evergreen",
  database: "self_scribe",
  password: "DBpw",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };
