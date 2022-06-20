"use strict";

var express = require("express");

var router = express.Router();

var MovieController = require("../controllers/movie.controller.js");

var UsersController = require("../controllers/user.controller.js");

var LoginController = require("../controllers/login.controller.js");

var CommentController = require("../controllers/comment.controller.js");

var CollectionController = require("../controllers/collection.controller.js");

var NotificationController = require("../controllers/notification.controller.js");

var PreferenceController = require("../controllers/preferences.controller.js");

var RankingController = require("../controllers/ranking.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
router.get("/movies/:id", MovieController);
router.put("/movies/:_id", MovieController);
router.patch("/movies/:_id", MovieController);
router["delete"]("/movies/:_id", MovieController);
router.get("/comments", CommentController);
router.post("/comments", CommentController);
router["delete"]("/comments/:_id", CommentController);
router.get("/comments/:id", CommentController);
router.get("/preferences", PreferenceController);
router.get("/preferences/user/:id", PreferenceController);
router.post("/preferences", PreferenceController);
router.patch("/preferences/:id", PreferenceController);
router["delete"]("/preferences/:id", PreferenceController);
router.get("/ranking", RankingController);
router.get("/ranking/user/:id", RankingController);
router.put("/ranking", RankingController);
router["delete"]("/ranking/:id", RankingController);
router.get("/collections", CollectionController);
router.post("/collections", CollectionController);
router.get("/collections/:username", CollectionController);
router.patch("/collections/:_id", CollectionController);
router.put("/collections/:_id", CollectionController);
router["delete"]("/collections/:_id", CollectionController);
router.get("/notification", NotificationController);
router.post("/notification", NotificationController);
router.get("/notification/user/:id", NotificationController);
router.patch("/notification/:id", NotificationController);
router["delete"]("/notification/:id", NotificationController);
router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:_id", UsersController);
router.get("/users/:email/:description", UsersController);
router.put("/users/:username", UsersController);
router.patch("/users/:username", UsersController);
router["delete"]("/users/:id", UsersController);
router.post("/login", LoginController);
router.get("/login", LoginController);
router.put("/login", LoginController);
module.exports = router;