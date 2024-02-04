const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { pool } = require("./dbConfig");

const port = 5000 || 80 || 443;

app.get("/", async (req, res) => {
  res.send("Welcome");
});

app.get("/movies", async (req, res) => {
  let sqlQuery = "SELECT * FROM movies";
  pool.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send({
        Status: true,
        message: "Data retrieved successfully",
        result: results.rows,
      });
    }
  });
});

app.post("/movie", async (req, res) => {
  let dataToBeInserted = req.body;
  let sqlQuery = `INSERT INTO movies (MovieID, Title, ReleaseDate, Genre, DirectorID, CountryID) VALUES ('${dataToBeInserted["MovieID"]}', '${dataToBeInserted["Title"]}', '${dataToBeInserted["ReleaseDate"]}', '${dataToBeInserted["Genre"]}' ,(SELECT DirectorID FROM directors WHERE DirectorName LIKE '${dataToBeInserted["DirectorName"]}%'),(SELECT CountryID FROM countries WHERE CountryName LIKE '${dataToBeInserted["CountryName"]}%'))`;
  pool.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send({
        status: true,
        message: "Data added successfully",
        result: [],
      });
    }
  });
});

app.put("/movie", async (req, res) => {
  const dataToBeUpdated = req.body;
  let sqlQuery = `UPDATE movies SET Title = '${dataToBeUpdated.NewMovieName}' WHERE MovieID = '${dataToBeUpdated.MovieID}'`;
  pool.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send({
        status: true,
        message: "Data updated successfully",
        result: [],
      });
    }
  });
});

app.delete("/movie", async (req, res) => {
  const dataToBeDeleted = req.body;
  let sqlQuery = `DELETE FROM movies WHERE MovieID = '${dataToBeDeleted.MovieID}'`;
  pool.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        message: "Failed to delete the data",
        error: "err.message",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "Date deleted successfully",
        result: [],
      });
    }
  });
});

app.listen(port, () => console.log(`Server is listening at port ${port}`));
