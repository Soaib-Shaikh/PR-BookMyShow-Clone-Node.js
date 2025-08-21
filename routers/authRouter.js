const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

// GET /auth just redirects to home (modal is always present)
router.get('/', authController.login);

// POST /auth (login)
router.post('/', authController.loginPost);

// login route
router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (username === "test" && password === "1234") {
    req.session.username = username;
    res.render("pages/home", {
      session: req.session,
      message: "Login successful!",
      messageType: "success"
    });
  } else {
    res.render("pages/home", {
      session: req.session,
      message: "Invalid username or password",
      messageType: "danger"
    });
  }
});

// signup route
router.post("/auth/signup", (req, res) => {
  const { username, email, password } = req.body;

  // fake check (replace with real DB logic)
  if (username && email && password) {
    res.render("pages/home", {
      session: req.session,
      message: "Account created successfully!",
      messageType: "success"
    });
  } else {
    res.render("pages/home", {
      session: req.session,
      message: "Signup failed. Try again.",
      messageType: "danger"
    });
  }
});


// POST /auth/signup
router.post('/signup', authController.signup);

router.get('/logout', authController.logout);

module.exports = router;
