const express = require("express");

const app = express();

app.use(express.json());

// const sql = require("msnodesqlv8");

const dbConfig = require("./dbConfig");

const port = 5000;

app.get("/", async (req, res) => {
  res.send("Welcome");
});

// app.get("/movies", async (req, res) => {
//   let sqlQuery = "SELECT * FROM movies";
//   sql.query(dbConfig, sqlQuery, (err, rows) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.status(200).send({
//         Status: true,
//         message: "Data retrieved successfully",
//         result: rows,
//       });
//     }
//   });
// });

// app.post("/movie", async (req, res) => {
//   let dataToBeInserted = req.body;
//   let sqlQuery = `INSERT INTO movies (MovieID, Title, ReleaseDate, Genre, DirectorID, CountryID) VALUES ('${dataToBeInserted["MovieID"]}', '${dataToBeInserted["Title"]}', '${dataToBeInserted["ReleaseDate"]}', '${dataToBeInserted["Genre"]}' ,(SELECT DirectorID FROM directors WHERE DirectorName LIKE '${dataToBeInserted["DirectorName"]}%'),(SELECT CountryID FROM countries WHERE CountryName LIKE '${dataToBeInserted["CountryName"]}%'))`;
//   sql.query(dbConfig, sqlQuery, (err, rows) => {
//     if (err) {
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.status(200).send({
//         status: true,
//         message: "Data added successfully",
//         result: [],
//       });
//     }
//   });
// });

// app.put("/movie", async (req, res) => {
//   const dataToBeUpdated = req.body;
//   let sqlQuery = `UPDATE movies SET Title = '${dataToBeUpdated.NewMovieName}' WHERE MovieID = '${dataToBeUpdated.MovieID}'`;
//   sql.query(dbConfig, sqlQuery, (err, rows) => {
//     if (err) {
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.status(200).send({
//         status: true,
//         message: "Data updated successfully",
//         result: [],
//       });
//     }
//   });
// });

// app.delete("/movie", async (req, res) => {
//   const dataToBeDeleted = req.body;
//   let sqlQuery = `DELETE FROM movies WHERE MovieID = '${dataToBeDeleted.MovieID}'`;
//   sql.query(dbConfig, sqlQuery, (err, rows) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send({
//         status: false,
//         message: "Failed to delete the data",
//         error: "err.message",
//       });
//     } else {
//       res.status(200).send({
//         status: true,
//         message: "Date deleted successfully",
//         result: [],
//       });
//     }
//   });
// });

app.listen(port, () => console.log(`Server is listening at port ${port}`));
