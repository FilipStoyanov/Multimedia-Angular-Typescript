"use strict";

var express = require("express");

var router = express.Router();

var MovieController = require("../controllers/movie.controller.js");

var UsersController = require("../controllers/user.controller.js");

var LoginController = require("../controllers/login.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:username", UsersController);
router.post("/login", LoginController);
router.get("/login", LoginController);
router.put("/login", LoginController);
module.exports = router;