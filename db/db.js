import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("db/dev.db", (error) => {
  if (error) {
    return console.error(error.message);
  }
  console.log("connected to database");
});
