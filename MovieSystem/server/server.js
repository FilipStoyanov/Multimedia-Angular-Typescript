const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const routes = require("./app/routes/router.routes.js");
const MovieController = require("./app/controllers/movie.controller");

app.use(cors());

const db = require("./app/models/index.js");
db.mongoose
  .connect(db.url,{
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Can not connect to the database!", err);
    process.exit();
  })

  //simple route
  app.use(express.json());
  app.use(bodyParser.urlencoded({extended: true}));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Service is running on port ${PORT}.`);
  })
  app.use('/api', routes)

