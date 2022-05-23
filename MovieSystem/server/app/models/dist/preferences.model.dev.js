"use strict";

var mongoose = require("mongoose");

var preferencesSchema = new mongoose.Schema({
  senderId: {
    required: true,
    type: String
  },
  senderUsername: {
    required: true,
    type: String
  },
  movies: [{
    titleEn: String,
    titleBg: String,
    image: String,
    year: String,
    id: String
  }],
  receivers: {
    required: true,
    type: Array
  },
  seen: {
    required: false,
    type: Boolean
  }
});
module.exports = mongoose.model('Preferences', preferencesSchema, "Preferences");