"use strict";

var express = require("express");

var router = express.Router();

var MovieController = require("../controllers/movie.controller.js");

var UsersController = require("../controllers/user.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:username", UsersController);
module.exports = router;