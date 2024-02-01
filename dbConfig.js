const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL
  );
`;

// Execute the query to create the table
pool.query(createTableQuery, (error, results) => {
  if (error) {
    throw error;
  }
  console.log("Table created successfully");
  // Now you can perform other operations with the database
  // Close the pool to end the script
  pool.end();
});

// const connectionString = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=${process.env.DB_TRUSTED_CONNECTION};Driver=${process.env.DB_DRIVER}`;

// const query = "SELECT * FROM awards";

// sql.query(connectionString, query, (err, rows) => console.log("Hello"));

// module.exports = connectionString;
