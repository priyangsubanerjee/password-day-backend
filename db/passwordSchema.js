const mongoose = require("mongoose");
const { Schema } = mongoose;

const passwordSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  hints: {
    type: Array,
    default: [],
  },
  year: {
    type: Number,
    required: true,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.passwords || mongoose.model("passwords", passwordSchema);
