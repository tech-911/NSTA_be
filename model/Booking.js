const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  destination: {
    type: String,
    required: true,
    min: 2,
    max: 1024,
  },
  passangers_number: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  car_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
});

const Booking = mongoose.model("Booking", userSchema);
module.exports = { Booking };
