"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user.model.js");

var userExists = function userExists(email) {
  var user;
  return regeneratorRuntime.async(function userExists$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email.toLowerCase().trim()
          }));

        case 2:
          user = _context.sent;

          if (!user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", true);

        case 5:
          return _context.abrupt("return", false);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

router.get('/Users', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context2.sent;
          res.send({
            data: users
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
router.post('/Users', function _callee2(req, res) {
  var user, s, newUser;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = new User({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            birthdate: req.body.birthday,
            username: req.body.username,
            password: req.body.password,
            role: 'user'
          });
          _context3.prev = 1;
          s = userExists(req.body.email);
          _context3.next = 5;
          return regeneratorRuntime.awrap(userExists(req.body.email));

        case 5:
          if (!_context3.sent) {
            _context3.next = 9;
            break;
          }

          res.status(409).json({
            error: 'Email already exists'
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          newUser = _context3.sent;
          res.status(201).json(newUser);

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          res.status(400).json({
            message: _context3.t0.message
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
});
module.exports = router;