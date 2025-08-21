const Movie = require('../models/movieSchema');
// Render the booking form
exports.renderBookingForm = async (req, res) => {
	const user = req.session && req.session.user ? req.session.user : null;
	let movie = null;
	let allMovies = [];
	if (req.query.movieId) {
		try {
			movie = await Movie.findById(req.query.movieId).lean();
		} catch (err) {
			movie = null;
		}
	}
	if (!movie) {
		allMovies = await Movie.find({}, '_id title').lean();
	}
	res.render('pages/booking', { movie, user, allMovies });
};

// Handle booking submission
exports.createBooking = async (req, res) => {
	try {
		// You can add validation and save booking to DB here
		// For now, just return success
		res.json({ success: true, message: 'Booking successful!' });
	} catch (err) {
		res.json({ success: false, message: 'Booking failed.' });
	}
};
