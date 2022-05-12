"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var router = express.Router();

var User = require("../models/user.model.js");

router.param('email', function (req, res, next, email) {
  var modified = email;
  req.email = modified;
  next();
});
router.param('username', function (req, res, next, username) {
  var modified = username;
  req.username = modified;
  next();
});
router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});

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

var userExistsByUser = function userExistsByUser(username) {
  var user;
  return regeneratorRuntime.async(function userExistsByUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 2:
          user = _context2.sent;

          if (!user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", true);

        case 5:
          return _context2.abrupt("return", false);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

router.get('/Users', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context3.sent;
          res.send({
            data: users
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/Users', function _callee2(req, res) {
  var user, newUser;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            image: req.body.image,
            birthdate: req.body.birthdate,
            username: req.body.username,
            password: req.body.password,
            role: 'user',
            id: ''
          });
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(userExists(req.body.email));

        case 4:
          if (!_context4.sent) {
            _context4.next = 8;
            break;
          }

          res.send(null); // res.status(409).json({
          //   error: 'Email already exists',
          // })

          _context4.next = 12;
          break;

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          newUser = _context4.sent;
          res.status(201).json(newUser);

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](1);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.get('/Users/:username', function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.params.username
          }));

        case 3:
          user = _context5.sent;
          res.send(user);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/Users/:_id', function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.params._id
          }));

        case 3:
          user = _context6.sent;
          res.send(user);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/Users/:username', function _callee5(req, res) {
  var updateUser, newFriends, index;
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.params.username
          }));

        case 3:
          updateUser = _context7.sent;
          newFriends = _toConsumableArray(updateUser.friends);

          if (updateUser.friends) {
            if (updateUser.friends.indexOf(req.body.friend) === -1) {
              newFriends.push(req.body.friend);
            } else {
              index = updateUser.friends.indexOf(req.body.friends);
              updateUser.friends.splice(index, 1);
              newFriends = _toConsumableArray(updateUser.friends);
            }
          } else {
            newFriends = _toConsumableArray(updateUser.friends);
          }

          _context7.next = 8;
          return regeneratorRuntime.awrap(User.updateOne({
            username: req.params.username
          }, {
            friends: _toConsumableArray(newFriends)
          }));

        case 8:
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t0.message
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.patch('/Users/:username', function _callee6(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          body = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            birthdate: req.body.birthdate
          };
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.updateOne({
            username: req.params.username
          }, body));

        case 4:
          _context8.next = 9;
          break;

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;