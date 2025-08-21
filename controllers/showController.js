const Show = require('../models/showSchema');
const Movie = require('../models/movieSchema');

// Get all shows for a movie
exports.getShowsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const shows = await Show.find({ movie: movieId }).populate('movie');
    res.render('pages/shows', { shows });
  } catch (err) {
    res.status(500).send('Error fetching shows');
  }
};

// Get a single show by ID
exports.getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await Show.findById(showId).populate('movie');
    if (!show) return res.status(404).send('Show not found');
    res.render('pages/show', { show });
  } catch (err) {
    res.status(500).send('Error fetching show details');
  }
};

// Create a new show
exports.createShow = async (req, res) => {
  try {
    const { movie, theater, time, price } = req.body;
    const newShow = new Show({ movie, theater, time, price });
    await newShow.save();
    res.status(201).send('Show created');
  } catch (err) {
    res.status(400).send('Error creating show');
  }
};

// Delete a show
exports.deleteShow = async (req, res) => {
  try {
    const showId = req.params.id;
    await Show.findByIdAndDelete(showId);
    res.send('Show deleted');
  } catch (err) {
    res.status(400).send('Error deleting show');
  }
};