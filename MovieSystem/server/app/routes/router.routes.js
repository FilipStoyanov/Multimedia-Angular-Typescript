const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");
const UsersController = require("../controllers/user.controller.js");
const LoginController = require("../controllers/login.controller.js");
const CommentController = require("../controllers/comment.controller.js");
const CollectionController = require("../controllers/collection.controller.js");

router.get("/movies", MovieController);
router.post("/movies", MovieController);
router.get("/movies/:id", MovieController);
router.put("/movies/:_id", MovieController);
router.patch("/movies/:_id", MovieController);
router.delete("/movies/:_id", MovieController);

router.get("/comments", CommentController);
router.post("/comments", CommentController);
router.delete("/comments/:_id", CommentController);
router.get("/comments/:id", CommentController);

router.get("/collections", CollectionController);
router.post("/collections", CollectionController);
router.get("/collections/:username", CollectionController);
router.put("/collections/:_id", CollectionController);
router.delete("/collections/:_id", CollectionController);


router.get("/users", UsersController);
router.post("/users", UsersController);
router.get("/users/:_id", UsersController);
router.get("/users/:username", UsersController);
router.put("/users/:username", UsersController);
router.patch("/users/:username", UsersController);

router.post("/login", LoginController);
router.get("/login", LoginController);
router.put("/login", LoginController);

module.exports = router;
