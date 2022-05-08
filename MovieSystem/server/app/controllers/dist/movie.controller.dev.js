"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var Movie = require("../models/movie.model.js");

var average = require("../helpers/helpers.js");

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.param('_id', function (req, res, next, _id) {
  var modified = _id;
  req._id = modified;
  next();
});
router.get('/Movies', function _callee(req, res) {
  var movies;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Movie.find());

        case 3:
          movies = _context.sent;
          res.send({
            data: movies
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/Movies/:id', function _callee2(req, res) {
  var movie;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Movie.findOne({
            _id: req.params.id
          }));

        case 3:
          movie = _context2.sent;
          res.send(movie);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/Movies', function _callee3(req, res) {
  var movie, newMovie;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          movie = new Movie({
            titleEn: req.body.titleEn,
            titleBg: req.body.titleBg,
            image: req.body.image,
            producer: req.body.producer,
            country: req.body.country,
            trailer: req.body.trailer,
            year: req.body.year,
            genre: req.body.genre,
            description: req.body.description,
            userId: req.body.userId
          });
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(movie.save());

        case 4:
          newMovie = _context3.sent;
          res.status(201).json(newMovie);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.put('/Movies/:_id', function _callee4(req, res) {
  var movie, newUserRatings, index, allRatings, i, av;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Movie.findById(req.params._id));

        case 3:
          movie = _context4.sent;
          newUserRatings = _toConsumableArray(movie.userRatings);
          index = movie.userRatings.findIndex(function (obj) {
            return obj.userId === req.body.userId;
          });

          if (index === -1) {
            newUserRatings.push({
              userId: req.body.userId,
              rating: req.body.rating
            });
          } else {
            movie.userRatings.splice(index, 1);
            newUserRatings = _toConsumableArray(movie.userRatings);
            newUserRatings.push({
              userId: req.body.userId,
              rating: req.body.rating
            });
          }

          allRatings = [];

          for (i = 0; i < newUserRatings.length; ++i) {
            allRatings.push(parseInt(newUserRatings[i].rating));
          }

          av = average(allRatings).toFixed(2);
          _context4.next = 12;
          return regeneratorRuntime.awrap(Movie.findByIdAndUpdate(req.params._id, {
            userRatings: _toConsumableArray(newUserRatings),
            averageRating: av
          }));

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.patch('/Movies/:_id', function _callee5(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          body = {
            image: req.body.image,
            titleEn: req.body.titleEn,
            titleBg: req.body.titleBg,
            description: req.body.description,
            trailer: req.body.trailer,
            year: req.body.year,
            producer: req.body.producer,
            country: req.body.country,
            genre: req.body.genre
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(Movie.findByIdAndUpdate(req.params._id, body));

        case 4:
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/Movies/:_id', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Movie.findByIdAndDelete(req.params._id));

        case 3:
          res.status(200).json();
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            message: _context6.t0.message
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;