"use strict";

var mongoose = require('mongoose');

var logoutSchema = new mongoose.Schema({
  token: {
    required: true
  }
});