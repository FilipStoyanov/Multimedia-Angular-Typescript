const mongoose = require("mongoose");
const rankingSchema = new mongoose.Schema({
  senderId: {
    required: true,
    type: Array,
  },
  senderUsername: {
    required: true,
    type: Array,
  },
  movies: [
    [
    {
        titleEn: String,
        titleBg: String,
        image: String,
        year: String,
        id: String,
    },
  ]],
  collectionId: {
    required: true,
    type: String,
  },
  collectionName: {
    required: true,
    type: String,
  },
  receiver: {
    required: true,
    type: String,
  },
  seen: {
    required: false,
    type: Boolean,
  }
})

module.exports = mongoose.model('Ranking', rankingSchema, "Ranking");
