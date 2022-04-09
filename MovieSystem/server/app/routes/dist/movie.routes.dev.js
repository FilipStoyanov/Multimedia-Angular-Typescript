"use strict";

var express = require("express");

var router = express.Router();

var MovieController = require("../controllers/movie.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
module.exports = router;