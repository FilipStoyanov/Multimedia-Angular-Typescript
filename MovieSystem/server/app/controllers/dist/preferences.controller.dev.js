"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var Preferences = require("../models/preferences.model.js");

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.get('/Preferences', function _callee(req, res) {
  var preferences;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Preferences.find());

        case 3:
          preferences = _context.sent;
          res.send({
            data: preferences
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
router.get('/Preferences/user/:id', function _callee2(req, res) {
  var preferences;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Preferences.find({
            receivers: req.params.id
          }));

        case 3:
          preferences = _context2.sent;
          res.send({
            data: preferences
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
router.patch('/Preference/:id', function _callee3(req, res) {
  var preference, ind, newReceivers, body;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          preference = Preferences.findById(req.params.id);
          ind = preference.receivers.indexOf(req.body.userId);
          newReceivers = _toConsumableArray(preference.splice(ind, 1));
          body = {
            receivers: newReceivers
          };
          _context3.next = 7;
          return regeneratorRuntime.awrap(Preferences.findByIdAndUpdate(req.params.id, body));

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/Preferences', function _callee4(req, res) {
  var preference, newPreference;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          preference = new Preferences({
            senderId: req.body.senderId,
            senderUsername: req.body.senderUsername,
            movies: req.body.movies,
            receivers: req.body.receivers,
            seen: false
          });
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(preference.save());

        case 4:
          newPreference = _context4.sent;
          res.status(201).json(newPreference);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router["delete"]('/Preferences/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Preferences.findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json();
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            message: _context5.t0.message
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;