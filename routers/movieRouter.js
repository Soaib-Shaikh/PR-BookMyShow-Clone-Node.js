
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const Movie = require('../models/movieSchema');


// Search movies by title
router.get('/search', movieController.searchMovies);

router.get('/:id', movieController.getMovieById);
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.redirect('/'); // fallback
    res.render('pages/movieDetails', { movie });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/add-movie', async (req, res) => {
  try {
    const { title, description, genre, releaseDate, rating } = req.body;
    const movie = new Movie({ title, description, genre, releaseDate, rating });
    await movie.save();
    res.status(201).send('Movie added!');
  } catch (err) {
    res.status(400).send('Error adding movie');
  }
});

module.exports = router;



