const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");
const UsersController = require("../controllers/user.controller.js");
const LoginController = require("../controllers/login.controller.js");


router.get("/movies", MovieController);
router.post("/movies", MovieController);

router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:username", UsersController);

router.post("/login", LoginController);
router.get("/login", LoginController);
router.put("/login", LoginController);

module.exports = router;
