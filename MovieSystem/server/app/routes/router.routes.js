const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");
const UsersController = require("../controllers/user.controller.js");


router.get("/movies", MovieController);
router.post("/movies", MovieController);

router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:username", UsersController);

module.exports = router;
