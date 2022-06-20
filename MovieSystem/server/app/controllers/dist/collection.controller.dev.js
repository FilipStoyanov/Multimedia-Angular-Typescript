"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var Collection = require("../models/collection.model.js");

var Movie = require("../models/movie.model.js");

router.param('username', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.param('_id', function (req, res, next, _id) {
  var modified = _id;
  req._id = modified;
  next();
});
router.get('/Collections', function _callee(req, res) {
  var collections;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Collection.find());

        case 3:
          collections = _context.sent;
          res.send({
            data: collections
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
router.get('/Collections/:username', function _callee2(req, res) {
  var collections;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Collection.find({
            user: req.params.username
          }));

        case 3:
          collections = _context2.sent;
          res.send(collections);
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
router.post('/Collections', function _callee3(req, res) {
  var collection, newCollection;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          collection = new Collection({
            user: req.body.user,
            movies: req.body.movies,
            name: req.body.name
          });
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(collection.save());

        case 4:
          newCollection = _context3.sent;
          res.status(201).json(newCollection);
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
router.put('/Collections/:_id', function _callee4(req, res) {
  var collectionMovies, movie, index;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Collection.findById(req.params._id));

        case 3:
          collectionMovies = _context4.sent;
          movie = new Movie({
            titleEn: req.body.titleEn,
            titleBg: req.body.titleBg,
            image: req.body.image,
            year: req.body.year,
            id: req.body.id
          });
          _context4.next = 7;
          return regeneratorRuntime.awrap(collectionMovies.movies.findIndex(function (obj) {
            return obj.titleEn === req.body.titleEn;
          }));

        case 7:
          index = _context4.sent;

          if (index > -1) {
            collectionMovies.movies.splice(index, 1);
          } else {
            collectionMovies.movies.push(movie);
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(Collection.findByIdAndUpdate(req.params._id, {
            movies: _toConsumableArray(collectionMovies.movies)
          }));

        case 11:
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.patch('/Collections/:_id', function _callee5(req, res) {
  var body, reorderedCollection;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          body = {
            user: req.body.user,
            movies: req.body.movies,
            name: req.body.name
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(Collection.findByIdAndUpdate(req.params._id, body));

        case 4:
          reorderedCollection = _context5.sent;
          res.status(200).json(reorderedCollection);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router["delete"]('/Collections/:_id', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Collection.findByIdAndDelete(req.params._id));

        case 3:
          res.status(200);
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