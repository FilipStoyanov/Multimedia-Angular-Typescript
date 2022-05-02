"use strict";

var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
  token: {
    required: false,
    type: String
  },
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});
module.exports = mongoose.model('Login', loginSchema, 'Login');