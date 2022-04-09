"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var cors = require('cors');

var app = express();

var routes = require("./app/routes/movie.routes.js");

var MovieController = require("./app/controllers/movie.controller");

app.use(cors());

var db = require("./app/models/index.js");

db.mongoose.connect(db.url, {
  useNewUrlParser: true
}).then(function () {
  console.log("connected to database");
})["catch"](function (err) {
  console.log("Can not connect to the database!", err);
  process.exit();
}); //simple route

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Service is running on port ".concat(PORT, "."));
});
app.use('/api', routes);