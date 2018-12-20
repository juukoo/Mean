var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
//require ContactSchema
const movie = require("./models");



router.get("/", function(req, res) {
  res.send("API.js index here");
});

//Get by id from movietest
router.get("/movie", function(req, res) {
  var mongoose = require("mongoose");
  require("./models.js");
  var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );

  var movie_id = mongoose.model("movie");

  //mongoDb id objectID
  movie_id.find({ _id: ObjectId("5bffe251bf6028f8d1a009cc") }, function(
    err,
    result
  ) {
    if (err) res.status(404).json(err);
    console.log(result);
    res.status(200).json(result);
  });
});

// update on movie data in db router.put / cannot Get error
router.get("/updatemov", function(req, res) {
  //Jos tähän laittaa router.put, antaa app errorin cannot GET /api/updateData
  var mongoose = require("mongoose");
  require("./models.js");

  var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  // Connecto to db
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );

  var movieUp = mongoose.model("movie");
  // find on movie and update it with some info
  movieUp.findOneAndUpdate(
    { title: "Feeding Sea Lions" },
    { $set: { year: 2000 } },
    { new: true },
    function(err, data) {
      if (err) res.status(404).json(err);

      console.log(data);
      res.status(200).json(data);
    }
  );
});

//Add movie to movietest
// router.post("/addmovie", (req, res) => {
//   var mongoose = require("mongoose");
//   require("./models.js");
//   var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";
//
//   mongoose.connect(
//     url,
//     { useNewUrlParser: true }
//   );
//   console.log(url);
//   var newData = new movie(req.body);
//   newData
//     .save()
//     .then(item => {
//       res.send("item saved to database");
//     })
//     .catch(err => {
//       res.status(400).send("Data not saved to Database");
//     });
// });

// //Get all from movietest ilman mongoose
// router.get("/getall", function(req, res) {
//   var result = getResult(function(err, result) {
//     //for later Callback function
//     console.log(result);
//     res.render("pages/movies", { collection: result });
//   });
// });
//
// function getResult(callback) {
//   const MongoClient = require("mongodb").MongoClient;
//
//   const url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb"; // url to database
//
//   const dbname = "mongo_testdb"; // mongo database = dbname
//
//   MongoClient.connect(
//     url,
//     { useNewUrlParser: true },
//     function(err, client) {
//       if (err) {
//         console.log("ERROR!:", err); // Error viesti jo error
//       } else {
//         console.log("Connected to mlab database ", url); // muuten ilmoitus yhteydestä
//
//         const db = client.db(dbname); //db muuttuja saa databasen arvokseen
//
//         db.collection("movietest") //mLabin collection
//           .find({}) // Find all from DB
//           .limit(10) // rajaa tulokset 10
//           .sort({ date: -1 }) // sort by newest
//           .toArray(function(err, result) {
//             if (err) throw err;
//             console.log(result);
//             client.close();
//             callback(err, result);
//           });
//       }
//     }
//   );
// }

// Get all from movietest
router.get("/getall", function(req, res) {
  var mongoose = require("mongoose");
  require("./models.js");

  var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  // Connecto to db
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
  // Use model from models.js
  var movie = mongoose.model("movie");
  // All movies from database but limit to 10
  movie
    .find({})
    .limit(10)
    .then(function(err, data) {
      // possible errors
      if (err) res.status(404).json(err);
      // No errors show data
      console.log(data);
      res.status(200).json(data);
    });
});

// router.get("/deleteMov", function(req, res) {
//   var mongoose = require("mongoose");
//   require("./models.js");
//   var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";
//
//   mongoose.connect(
//     url,
//     { useNewUrlParser: true }
//   );
//
//   var movie_del = mongoose.model("movie");
//
//   //mongoDb id objectID
//   movie_del.deleteOne({ _id: ObjectId("5c1a91e290eae173188e14ce") }, function(
//     err,
//     result
//   ) {
//     if (err) res.status(404).json(err);
//     console.log("Deleted one movie!");
//     res.send("Deleted on movie!");
//   });
// });


//delete movie by id / router.delete antoi cannot GET errorin, jota en saanut toimimaan
router.get("/deletemov", function(req, res) {
  var mongoose = require("mongoose");
  require("./models.js");
  var url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );


  movie
    .remove({ _id: ObjectId("5c1b72fc3212d84068685d25")}, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });



module.exports = router;
