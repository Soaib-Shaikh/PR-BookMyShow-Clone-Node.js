const { getMovieDetails, getMovieCredits } = require("../services/tmdb");
const Movie = require("../models/movieSchema");

exports.searchMovies = async (req, res) => {
  try {
    const query = req.query.query || "";
    // Case-insensitive search by title
    const movies = await Movie.find({
      title: { $regex: query, $options: "i" }
    });
    res.render('index', {
      movies,
      query,
      query_loginError: false 
    });
  } catch (err) {
    res.status(500).send("Error searching movies");
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { movie, backdrops } = await getMovieDetails(movieId);
    const cast = await getMovieCredits(movieId);

    // Pass both to your EJS template
    res.render("pages/movie", { movie, cast, backdrops });
  } catch (err) {
    res.status(500).send("Error loading movie details");
  }
};