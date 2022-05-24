"use strict";

var express = require("express");

var router = express.Router();

var Notification = require("../models/notification.model.js");

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.get('/Notification', function _callee(req, res) {
  var notifications;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Notification.find());

        case 3:
          notifications = _context.sent;
          res.send({
            data: notifications
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
router.get('/Notification/user/:id', function _callee2(req, res) {
  var notifications;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Notification.find({
            receiver: req.params.id
          }));

        case 3:
          notifications = _context2.sent;
          res.send({
            data: notifications
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
router.post('/Notification', function _callee3(req, res) {
  var notification, newNotification;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          notification = new Notification({
            senderId: req.body.senderId,
            senderUsername: req.body.senderUsername,
            receiver: req.body.receiver,
            movieId: req.body.movieId,
            seen: false,
            type: req.body.type
          });
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(notification.save());

        case 4:
          newNotification = _context3.sent;
          res.status(201).json(newNotification);
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
router.patch('/Notification/:id', function _callee4(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          body = {
            senderId: req.body.senderId,
            senderUsername: req.body.senderUsername,
            receiver: req.body.receiver,
            movieId: req.body.movieId,
            seen: req.body.seen,
            type: req.body.type
          };
          _context4.next = 4;
          return regeneratorRuntime.awrap(Notification.findByIdAndUpdate(req.params.id, body));

        case 4:
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/Notification/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Notification.findByIdAndDelete(req.params.id));

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