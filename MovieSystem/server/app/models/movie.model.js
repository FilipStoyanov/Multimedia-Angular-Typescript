const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  titleEn: {
    required: true,
    type: String
  },
  titleBg: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: String,
  },
  genre: {
    required: true,
    type: String,
  },
  producer: {
    required: true,
    type: String,
  },
  genre: {
    required: true,
    type: String,
  },
  watches: {
    required: false,
    type: Number,
  },
  country: {
    required: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  trailer: {
    require: true,
    type: String,
  },
  id: {
    required: false,
    type: String,
  },
  userId: {
    required: false,
    type: String,
  },
  userRatings: {
    required: false,
    type: [{
      userId: String,
      rating: String,
    }]
  },
  averageRating: {
    required: false,
    type: String,
  }
})

module.exports = mongoose.model('Movie', movieSchema, "Movies");
