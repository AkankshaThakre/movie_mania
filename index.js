const express = require("express");

const app = express();

const sql = require("msnodesqlv8");

const dbConfig = require("./dbConfig");

const producersData = require("./Assets/producersData.json");

const producers = producersData.producers;
let sqlQuery = `INSERT INTO producers (ProducerID, ProducerName, BirthDate, CountryID)`;

producers.map((producer, index) => {
  if (index === producers.length - 1) {
    sqlQuery =
      sqlQuery +
      `SELECT '${producer["ProducerID"]}', '${producer["ProducerName"]}', '${producer["BirthDate"]}', (SELECT CountryID from countries WHERE CountryName LIKE '${producer["CountryName"]}%');`;
  } else {
    sqlQuery =
      sqlQuery +
      `SELECT '${producer["ProducerID"]}', '${producer["ProducerName"]}', '${producer["BirthDate"]}', (SELECT CountryID from countries WHERE CountryName LIKE '${producer["CountryName"]}%')
      UNION ALL
      `;
  }
});

const port = 5000;

app.get("/", async (req, res) => {
  sql.query(dbConfig, sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(rows);
      res.send("Data stored successfully");
    }
  });
});

app.listen(port, () => console.log(`Server is listening at port ${port}`));
