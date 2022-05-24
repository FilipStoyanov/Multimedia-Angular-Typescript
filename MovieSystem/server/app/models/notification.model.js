const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  senderId: {
    required: true,
    type: String
  },
  senderUsername: {
    required: true,
    type: String,
  },
  receiver: {
    required: true,
    type: String,
  },
  movieId: {
    required: true,
    type: String,
  },
  seen: {
    required: true,
    type: Boolean,
  },
  type: {
    required: true,
    type: String,
  }
})

module.exports = mongoose.model('Notification', notificationSchema, "Notification");
