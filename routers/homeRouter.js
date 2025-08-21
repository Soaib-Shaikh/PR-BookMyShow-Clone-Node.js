const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// homepage
router.get("/", homeController.index);

module.exports = router;
