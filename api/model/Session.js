const mongoose = require("mongoose");

//Schema for the collection that holds user session data
//username and createdAt (expires after an hour)
const sessionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 1,
      max: 40
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now
    }
  },
  {
    collection: "session"
  }
);

module.exports = mongoose.model("Session", sessionSchema);
