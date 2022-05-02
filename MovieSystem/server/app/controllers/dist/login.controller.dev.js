"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user.model.js");

var Login = require("../models/login.model.js");

var jwt = require('jsonwebtoken');

router.post('/Login', function _callee(req, res) {
  var LogUser, _req$body, username, password, user, passwordCorrect, userForToken, token, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          LogUser = new Login({
            token: "",
            username: req.body.username,
            password: req.body.password
          });
          _context.prev = 1;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 5:
          user = _context.sent;
          passwordCorrect = user === null ? false : user.password === password;

          if (!(!user || !passwordCorrect)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'invalid username or password'
          }));

        case 9:
          userForToken = {
            username: user.username,
            id: user._id
          };
          token = jwt.sign(userForToken, "secret");
          LogUser.token = token;
          _context.next = 14;
          return regeneratorRuntime.awrap(LogUser.save());

        case 14:
          newUser = _context.sent;
          res.status(201).json(newUser);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: _context.t0.message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
});
router.get('/Login', function _callee2(req, res) {
  var loggedUsers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Login.find());

        case 3:
          loggedUsers = _context2.sent;
          res.send({
            data: loggedUsers
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
router.put('/Login', function _callee3(req, res) {
  var email, filter, loggedUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          filter = {
            email: req.body.email
          };
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Login.findOne({
            email: email
          }));

        case 5:
          loggedUser = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(Login.updateOne(filter, {
            token: ''
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(loggedUser.save());

        case 10:
          res.status(204).json(loggedUser);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json({
            message: _context3.t0.message + email
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 13]]);
});
module.exports = router;