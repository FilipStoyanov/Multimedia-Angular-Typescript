"use strict";

var express = require("express");

var router = express.Router();

var Comment = require("../models/comment.model.js");

var ObjectId = require('mongoose').Types.ObjectId;

router.param('id', function (req, res, next, id) {
  var modified = id;
  req.id = modified;
  next();
});
router.param('_id', function (req, res, next, _id) {
  var modified = _id;
  req._id = modified;
  next();
});
router.get('/Comments', function _callee(req, res) {
  var comments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Comment.find());

        case 3:
          comments = _context.sent;
          res.send({
            data: comments
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
router.get('/Comments/:id', function _callee2(req, res) {
  var comments;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            id: req.params.id
          }));

        case 3:
          comments = _context2.sent;
          res.send(comments);
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
router.post('/Comments', function _callee3(req, res) {
  var comment, newComment;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          comment = new Comment({
            username: req.body.username,
            userId: req.body.userId,
            image: req.body.image,
            description: req.body.description,
            date: req.body.date,
            id: req.body.id
          });
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(comment.save());

        case 4:
          newComment = _context3.sent;
          res.status(201).json(newComment);
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
router["delete"]('/Comments/:_id', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Comment.findByIdAndDelete(req.params._id));

        case 3:
          res.sendStatus(200).json();
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