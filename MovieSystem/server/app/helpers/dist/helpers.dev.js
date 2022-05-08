"use strict";

var average = function average(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0) / arr.length;
};

module.exports = average;