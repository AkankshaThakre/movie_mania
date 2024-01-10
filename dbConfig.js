const sql = require("msnodesqlv8");

require("dotenv").config();

const connectionString = `Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Trusted_Connection=${process.env.DB_TRUSTED_CONNECTION};Driver=${process.env.DB_DRIVER}`;

const query = "SELECT * FROM actors";

sql.query(connectionString, query, (err, rows) => console.log(rows));

module.exports = connectionString;
