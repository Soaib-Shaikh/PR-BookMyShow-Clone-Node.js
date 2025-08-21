const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Render booking form (GET)
router.get('/', bookingController.renderBookingForm);

// Handle booking submission (POST)
router.post('/', bookingController.createBooking);

module.exports = router;
