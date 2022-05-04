"use strict";

var express = require("express");

var router = express.Router();

var Movie = require("../models/movie.model.js");

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
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
            year: req.body.year
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
module.exports = router;