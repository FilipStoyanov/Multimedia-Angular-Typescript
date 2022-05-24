"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var Ranking = require("../models/ranking.model.js");

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.get('/Ranking', function _callee(req, res) {
  var ranking;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Ranking.find());

        case 3:
          ranking = _context.sent;
          res.send({
            data: ranking
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
router.get('/Ranking/user/:id', function _callee2(req, res) {
  var ranking;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Ranking.find({
            receiver: req.params.id
          }));

        case 3:
          ranking = _context2.sent;
          res.send({
            data: ranking
          });
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
router.put('/Ranking', function _callee3(req, res) {
  var filter, ranking, _ref, newMovies, flatArray, newSenderId, newSenderUsername, _ranking, newRanking;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          filter = {
            collectionId: req.body.collectionId
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(Ranking.findOne({
            collectionId: req.body.collectionId
          }));

        case 4:
          ranking = _context3.sent;

          if (!ranking) {
            _context3.next = 21;
            break;
          }

          newMovies = [];
          newMovies = _toConsumableArray(ranking.movies);
          flatArray = (_ref = []).concat.apply(_ref, _toConsumableArray(req.body.movies));
          newMovies.push(flatArray);
          newSenderId = [];
          newSenderId = ranking.senderId;
          newSenderId.push(req.body.senderId.toString());
          newSenderUsername = [];
          newSenderUsername = ranking.senderUsername;
          newSenderUsername.push(req.body.senderUsername.toString());
          _context3.next = 18;
          return regeneratorRuntime.awrap(Ranking.findOneAndUpdate(filter, {
            senderId: newSenderId,
            senderUsername: newSenderUsername,
            movies: newMovies
          }));

        case 18:
          res.status(201).json(ranking);
          _context3.next = 26;
          break;

        case 21:
          _ranking = new Ranking({
            senderId: req.body.senderId,
            senderUsername: req.body.senderUsername,
            movies: _toConsumableArray(req.body.movies),
            collectionId: req.body.collectionId,
            collectionName: req.body.collectionName,
            receiver: req.body.receiver,
            seen: false
          });
          _context3.next = 24;
          return regeneratorRuntime.awrap(_ranking.save());

        case 24:
          newRanking = _context3.sent;
          res.status(201).json(newRanking);

        case 26:
          _context3.next = 31;
          break;

        case 28:
          _context3.prev = 28;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 31:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 28]]);
});
router["delete"]('/Ranking/:id', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Ranking.findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json();
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;