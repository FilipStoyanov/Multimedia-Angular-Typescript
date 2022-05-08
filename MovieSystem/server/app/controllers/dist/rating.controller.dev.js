"use strict";

var _require = require("@angular/compiler-cli/src/ngtsc/metadata/src/util"),
    readStringArrayType = _require.readStringArrayType;

var express = require("express");

var router = express.Router();

var Rating = require("../models/rating.model.js");

router.param('_id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.get('/Ratings', function _callee(req, res) {
  var ratings;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Rating.find());

        case 3:
          ratings = _context.sent;
          res.send({
            data: ratings
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
router.get('/Ratings/:_id', function _callee2(req, res) {
  var rating;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Rating.find({
            id: req.params.id
          }));

        case 3:
          rating = _context2.sent;
          res.send(rating);
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
router.post('/Ratings', function _callee3(req, res) {
  var rating;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Rating.find({
            movieId: req.params.id
          }));

        case 3:
          rating = _context3.sent;
          res.status(201).json(newComment);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;