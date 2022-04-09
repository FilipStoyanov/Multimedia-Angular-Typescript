const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");


router.get("/movies", MovieController);
router.post("/movies", MovieController);

module.exports = router;
