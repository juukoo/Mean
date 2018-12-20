//Schema for app to use movie database

const mongoose = require("mongoose");

const MovieModelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    require: true
  },
  cast: {
    type: String
  },
  genres: {
    type: String
  }
});

//  data model
const movie = (module.exports = mongoose.model(
  "movie",
  MovieModelSchema,
  "movietest"
)); // movietest to connect existing collection in mLab
