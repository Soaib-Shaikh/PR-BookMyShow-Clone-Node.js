const bodyParser = require("body-parser");
const express = require("express");
const db = require("./configs/db");
const app = express();
const path = require("path");
const router = require("./routers");
const port = process.env.port || 3000;
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", router);


app.get("/movies", async (req, res) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_KEY`
  );

  // Fetch runtime for each movie
  const moviesWithRuntime = await Promise.all(
    response.data.results.map(async (movie) => {
      try {
        const details = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=YOUR_KEY`
        );
        return { ...movie, runtime: details.data.runtime, genres: details.data.genres.map(g => g.name) };
      } catch (err) {
        return { ...movie, runtime: null, genres: [] };
      }
    })
  );

  res.render("movies", { movies: moviesWithRuntime });
});

// Book Tickets Page Route
app.get("/book/:id", async (req, res) => {
    try {
        const movieId = req.params.id;

        // Agar tumhare paas MongoDB ya API ka data hai toh waha se fetch karo
        // Abhi hum dummy data use kar rahe hain
        const movie = movies.find(m => m.id == movieId);

        res.render("pages/booking", {
            user: req.user || null,
            movie: movie || null
        });
    } catch (error) {
        console.log("Booking Page Error:", error);
        res.redirect("/");
    }
});


app.listen(port, () => {
  try {
    db;
    console.log("Server Start on http://localhost:" + port);
  } catch (error) {
    console.log(error.message);
  }
});
