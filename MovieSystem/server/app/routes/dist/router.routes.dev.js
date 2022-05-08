"use strict";

var express = require("express");

var router = express.Router();

var MovieController = require("../controllers/movie.controller.js");

var UsersController = require("../controllers/user.controller.js");

var LoginController = require("../controllers/login.controller.js");

var CommentController = require("../controllers/comment.controller.js");

var CollectionController = require("../controllers/collection.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
router.get("/movies/:id", MovieController);
router.put("/movies/:_id", MovieController);
router.get("/comments", CommentController);
router.post("/comments", CommentController);
router["delete"]("/comments/:_id", CommentController);
router.get("/comments/:id", CommentController);
router.get("/collections", CollectionController);
router.post("/collections", CollectionController);
router.get("/collections/:username", CollectionController);
router.put("/collections/:_id", CollectionController);
router["delete"]("/collections/:_id", CollectionController);
router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:username", UsersController);
router.get("/users/:id", UsersController);
router.put("/users/:username", UsersController);
router.post("/login", LoginController);
router.get("/login", LoginController);
router.put("/login", LoginController);
module.exports = router;