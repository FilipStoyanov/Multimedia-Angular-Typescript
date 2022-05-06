"use strict";

var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
  }
});
module.exports = mongoose.model('Comment', commentSchema, "Comments");