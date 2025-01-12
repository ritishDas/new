const mongoose = require("mongoose");

// Participant Schema
const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  year:{
    type:Number,
      required:true,
  }
});

const Participant = mongoose.model("participant", participantSchema);

module.exports = Participant;
