const mongoose = require("mongoose");
const Movie = require("./movie.model.js");
const collectionSchema = new mongoose.Schema({
   user: {
     required: true,
     type: String,
   },
   movies: [
     {
       titleEn: String,
       titleBg: String,
       image: String,
       year: String,
       id: String,
     },
   ],
   name: String,
})

module.exports = mongoose.model('Collection', collectionSchema, "Collections");
