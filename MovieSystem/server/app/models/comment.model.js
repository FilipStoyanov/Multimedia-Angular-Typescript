const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String
  },
  description: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String,
  }
})

module.exports = mongoose.model('Comment', commentSchema, "Comments");
