const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: "String",
  },
  customers: [String],
  upcoming: {
    type: "Boolean",
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// ovo gdje piše Launch inače uvijek treba biti napisano baš tako u jednini, a Mongo od toga napravi plural
// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model("Launch", launchesSchema);
