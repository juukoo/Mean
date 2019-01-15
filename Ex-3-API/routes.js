var express = require("express");
var router = express.Router();
var ejs = require("ejs");
const movie = require("./models"); // require schema

// Define the home page route
router.get("/", function(req, res) {
  res.render("pages/index");
});

//ei toimiva getall ejs näkymä
router.get("/movies", function(req, res) {
  res.render("pages/movies");
});

// addmovie route
router.get("/addmovie", function(req, res) {
  res.render("pages/addmovie");
});





router.post("/addmovie", (req, res) => {
  var mongoose = require("mongoose");
  require("./models.js");
  var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  console.log(url);
  var newData = new movie(req.body);
  newData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("Data not saved to Database");
    });
});

module.exports = router;
