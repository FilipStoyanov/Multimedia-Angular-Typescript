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
            role: req.body.role || 'user',
            genres: req.body.genres,
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
          res.status(201).location("/api/users/".concat(newUser._id)).json(newUser);

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
router.get('/Users/:id', function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

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
router.get('/Users/:email/:description', function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.params.email
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
router.put('/Users/:id', function _callee5(req, res) {
  var updateUser, newFriends, friendIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, friend, index;

  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: req.params.id
          }));

        case 3:
          updateUser = _context7.sent;
          newFriends = _toConsumableArray(updateUser.friends);
          friendIds = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context7.prev = 9;

          for (_iterator = updateUser.friends[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            friend = _step.value;
            friendIds.push(friend.id);
          }

          _context7.next = 17;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context7.t0;

        case 17:
          _context7.prev = 17;
          _context7.prev = 18;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 20:
          _context7.prev = 20;

          if (!_didIteratorError) {
            _context7.next = 23;
            break;
          }

          throw _iteratorError;

        case 23:
          return _context7.finish(20);

        case 24:
          return _context7.finish(17);

        case 25:
          if (updateUser.friends) {
            if (friendIds.indexOf(req.body.friends.id) === -1) {
              newFriends.push(req.body.friends);
            } else {
              index = friendIds.indexOf(req.body.friends.id);
              updateUser.friends.splice(index, 1);
              newFriends = _toConsumableArray(updateUser.friends);
            }
          } else {
            newFriends = _toConsumableArray(updateUser.friends);
          }

          _context7.next = 28;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.params.id
          }, {
            friends: _toConsumableArray(newFriends)
          }));

        case 28:
          _context7.next = 33;
          break;

        case 30:
          _context7.prev = 30;
          _context7.t1 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t1.message
          });

        case 33:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 30], [9, 13, 17, 25], [18,, 20, 24]]);
});
router.patch('/Users/:id', function _callee6(req, res) {
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
            birthdate: req.body.birthdate,
            genres: req.body.genres,
            image: req.body.image
          };
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.updateOne({
            username: req.params.id
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
router["delete"]('/Users/:id', function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json();
          _context9.next = 9;
          break;

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          res.status(400).json({
            message: _context9.t0.message
          });

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;