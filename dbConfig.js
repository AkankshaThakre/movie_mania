const { Pool } = require("pg");

require("dotenv").config();

const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: connectionString,
});

// For 'countries' table

const countriesData = require("./Assets/countriesData.json");
const countries = countriesData.countries;

let insertDataIntoCountriesQuery =
  "INSERT INTO countries (CountryID, CountryName) VALUES ";

countries.forEach((obj, index) => {
  if (index !== countries.length - 1) {
    insertDataIntoCountriesQuery =
      insertDataIntoCountriesQuery +
      ` ('${obj.CountryID}', '${obj.CountryName}'),`;
  } else {
    insertDataIntoCountriesQuery =
      insertDataIntoCountriesQuery +
      ` ('${obj.CountryID}', '${obj.CountryName}');`;
  }
});

// For 'actors' table

const actorsData = require("./Assets/actorsData.json");
const actors = actorsData.actors;

let insertDataIntoActorsQuery =
  "INSERT INTO actors (ActorID, ActorName, BirthDate, CountryID) VALUES";

actors.forEach((obj, index) => {
  if (index !== actors.length - 1) {
    insertDataIntoActorsQuery =
      insertDataIntoActorsQuery +
      ` ('${obj.ActorID}', '${obj.ActorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%')),`;
  } else {
    insertDataIntoActorsQuery =
      insertDataIntoActorsQuery +
      ` ('${obj.ActorID}', '${obj.ActorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%'));`;
  }
});

// For 'directors' table

const directorsData = require("./Assets/directorsData.json");
const directors = directorsData.directors;

let insertDataIntoDirectorsQuery =
  "INSERT INTO directors (DirectorID, DirectorName, BirthDate, CountryID) VALUES";

directors.forEach((obj, index) => {
  if (index !== directors.length - 1) {
    insertDataIntoDirectorsQuery =
      insertDataIntoDirectorsQuery +
      ` ('${obj.DirectorID}', '${obj.DirectorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%')),`;
  } else {
    insertDataIntoDirectorsQuery =
      insertDataIntoDirectorsQuery +
      ` ('${obj.DirectorID}', '${obj.DirectorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%'));`;
  }
});

// For 'producers' table

const producersData = require("./Assets/producersData.json");
const producers = producersData.producers;

let insertDataIntoProducersQuery =
  "INSERT INTO producers (ProducerID, ProducerName, BirthDate, CountryID) VALUES";

producers.forEach((obj, index) => {
  if (index !== producers.length - 1) {
    insertDataIntoProducersQuery =
      insertDataIntoProducersQuery +
      ` ('${obj.ProducerID}', '${obj.ProducerName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%')),`;
  } else {
    insertDataIntoProducersQuery =
      insertDataIntoProducersQuery +
      ` ('${obj.ProducerID}', '${obj.ProducerName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%'));`;
  }
});

// For 'directors' table: missing data

const missingDirectorsData = require("./Assets/missingDirectorsData.json");
const missingDirectors = missingDirectorsData.missingDirectors;

let insertMissingDataIntoDirectorsQuery =
  "INSERT INTO directors (DirectorID, DirectorName, BirthDate, CountryID) VALUES";

missingDirectors.forEach((obj, index) => {
  if (index !== missingDirectors.length - 1) {
    insertMissingDataIntoDirectorsQuery =
      insertMissingDataIntoDirectorsQuery +
      ` ('${obj.DirectorID}', '${obj.DirectorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%')),`;
  } else {
    insertMissingDataIntoDirectorsQuery =
      insertMissingDataIntoDirectorsQuery +
      ` ('${obj.DirectorID}', '${obj.DirectorName}', '${obj.BirthDate}', (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%'));`;
  }
});

// For 'movies' table

const moviesData = require("./Assets/moviesData.json");
const movies = moviesData.movies;

let insertDataIntoMoviesQuery =
  "INSERT INTO movies (MovieID, Title, ReleaseDate, Genre, DirectorID, CountryID) VALUES";

movies.forEach((obj, index) => {
  if (index !== movies.length - 1) {
    insertDataIntoMoviesQuery =
      insertDataIntoMoviesQuery +
      ` ('${obj.MovieID}', '${obj.Title}', '${obj.ReleaseDate}', '${obj.Genre}', (SELECT DirectorID from directors WHERE DirectorName LIKE '${obj.DirectorName}%'), (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%')),`;
  } else {
    insertDataIntoMoviesQuery =
      insertDataIntoMoviesQuery +
      ` ('${obj.MovieID}', '${obj.Title}', '${obj.ReleaseDate}', '${obj.Genre}', (SELECT DirectorID from directors WHERE DirectorName LIKE '${obj.DirectorName}%'), (SELECT CountryID from countries WHERE CountryName LIKE '${obj.CountryName}%'));`;
  }
});

// For 'awards' table

const awardsData = require("./Assets/awardsData.json");
const awards = awardsData.awards;

let insertDataIntoAwardsQuery =
  "INSERT INTO awards (AwardID, AwardName, Category, Year) VALUES";

awards.forEach((obj, index) => {
  if (index !== awards.length - 1) {
    insertDataIntoAwardsQuery =
      insertDataIntoAwardsQuery +
      ` ('${obj.AwardID}', '${obj.AwardName}', '${obj.Category}', '${obj.Year}'),`;
  } else {
    insertDataIntoAwardsQuery =
      insertDataIntoAwardsQuery +
      ` ('${obj.AwardID}', '${obj.AwardName}', '${obj.Category}', '${obj.Year}');`;
  }
});

// Execute the query to create the table
let query = "SELECT * FROM users";
pool.query(query, (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results.rows);
});

module.exports = { pool };
