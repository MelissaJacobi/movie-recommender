import express from "express";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const port = 3000;

app.use(express.static("assets"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",  
  port: 5432,
});
db.connect()

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/watchlist", (req, res) => {
  res.render("watchlist.ejs");
});

app.get("/watched", (req, res) => {
  res.render("watched.ejs");
});

// for recommend button
app.post("/recommend", async (req, res) => {
    const { mood, genre } = req.body;
    console.log("Received Mood:", mood);
    console.log("Received Genre:", genre);
  
    try {
      const result = await db.query(
          "SELECT movie, image_url, trailer, description FROM movies WHERE LOWER(mood) = LOWER($1) AND LOWER(genre) = LOWER($2)",
          [mood, genre]
        );

      console.log("Query Result:", result.rows);
      
      res.render("results.ejs", { movies: result.rows });
  } catch (err) {
      console.error("Error fetching movies:", err);
      res.status(500).send("Internal Server Error");
  }
});

  // for surprise me button
  app.post("/surprise", async (req, res) => {
    try {
      const result = await db.query(
        "SELECT movie, image_url, trailer, description FROM movies ORDER BY RANDOM() LIMIT 1"
      );
  
      console.log("Surprise Movie:", result.rows);
  
      res.render("results.ejs", { movies: result.rows });
      console.log(result.rows);
    } catch (err) {
      console.error("Error fetching random movie:", err);
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});