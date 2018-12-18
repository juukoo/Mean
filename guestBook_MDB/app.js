//import modules to app
var express = require("express");
var app = express();
var fs = require("fs");
var mongoose = require("mongoose");
var mongodb = require("mongodb");
// const uuidV4 = require("uuid/v4");  generates random id´s easily

// mongoose.connect( // mongoose connection to DB
//   "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb"
// );

//Schema testailua
// var guestSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   date: { type: Date, required: true, default: Date.now }
// });
// var Guest = mongoose.model("Guest", guestSchema);

//req body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//view egine ejs
app.set("view engine", "ejs");

//static files to use from public folder (css, images, static websites)
app.use(express.static(__dirname + "/public"));

//index page + some content for index
app.get("/", function(req, res) {
  res.render("pages/index", {
    new_heading: "Welcome to The ForestWeekend Resort",
    new_heading_2: "What is ForestWeekend Resort?",
    new_paragraph_1:
      "ForestWeekend Resort is an unique resort middle of nowhere by the world largest forest in Helsinki, Finland. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat no? Your warmly welcome to visit our resort.",
    new_paragraph_2:
      "If you are going to visit us be sure to make reservation by phone or via our mobile app, we are sure that you are going to enjoy your stay at our unique resort.",
    new_paragraph_3:
      "Our resort is open all year around and offers all kinds of activities from season to season!",
    new_paragraph_4:
      "Limitless activities from motocross to skiing, not to forget about sailing, hiking and whale watching. We are sure that there is not an activity that we can not offer for you, so be sure to visit us! ",
    new_paragraph_5: "Do you have any questions? be sure to contact us.",
    footer_email: "Send us a question with form below ->"
  });
});

//get json data - guestbook page
// json to ejs -> guestbook.ejs

// app.get("/guestbook", function(req, res) {
//   var dataset = require("./guest.json");
//   res.render("pages/guestbook", { data: dataset });
// });

//get data from database to guestbook page
app.get("/guestbook", function(req, res) {
  var result = getResult(function(err, result) {
    //for later Callback function
    console.log(result);
    res.render("pages/guestbook", { collection: result });
  });
});

function getResult(callback) {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb"; // url to database

  const dbname = "mongo_testdb"; // collection db name

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("ERROR!:", err);
      } else {
        console.log("Connected to mlab database ", url);

        const db = client.db(dbname);

        db.collection("guestb_db") // DB collection guests jos haluaa nähdä mongoose tallenteet
          .find({}) // Find all from DB
          .sort({ date: -1 }) // sort by newest
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(err, result);
          });
      }
    }
  );
}

//guestbook_edit page
app.get("/guestbook_edit", function(req, res) {
  var result = getResult_edit(function(err, result) {
    //for later Callback function
    console.log(result);
    res.render("pages/guestbook_edit", { collection: result });
  });
});

function getResult_edit(callback) {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb"; // url to database

  const dbname = "mongo_testdb"; // collection db name

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("ERROR!:", err);
      } else {
        console.log("Connected to mlab database", url);

        const db = client.db(dbname);

        db.collection("guestb_db") // DB collection guests jos haluaa nähdä mongoose tallenteet
          .find({}) // Find all from DB
          .sort({ date: -1 }) // sort by newest
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(err, result);
          });
      }
    }
  );
}

//parse json data to table
//   var results = '<table border="2"> ';
//
//   for (var i = 0; i < data.length; i++) {
//     results +=
//       "<tr>" +
//       "<td>" +
//       data[i].id +
//       "</td>" +
//       "<td>" +
//       data[i].username +
//       "</td>" +
//       "<td>" +
//       data[i].country +
//       "</td>" +
//       "<td>" +
//       data[i].date +
//       "</td>" +
//       "<td>" +
//       data[i].message +
//       "</td>" +
//       "</tr>";
//   }
//   res.status(200).send(results);
// });

//add new form to add new message
// app.get("/newmessage", function(req, res) {
//   res.sendFile(__dirname + "/addmessage.html");
// });

//newmessage page
app.get("/addmessage", function(req, res) {
  res.render("pages/addmessage");
});
//add new message to database
app.post("/newmessage", function(req, res) {
  saveMessage(req, function(err) {
    //for later Callback function
    // console.log(save_data);
    // res.render("pages/newmessage", { collection: save_data });
    res.redirect("/guestbook");
  });
});

function saveMessage(req, callback) {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  const dbname = "mongo_testdb";

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("ERROR!:", err);
      } else {
        console.log("Connected to mlab database", url);

        const db = client.db(dbname);

        var query = {
          username: req.body.username,
          country: req.body.country,
          message: req.body.message,
          date: new Date()
        };

        db.collection("guestb_db").insertOne(query, function(err, obj) {
          if (err) throw err;
          console.log("Saved one new message to DB!");
        });
        client.close();
        callback();
      }
    }
  );
}

// app.get("/guestbook_edit", function(req, res) {
//   res.render("pages/guestbook_edit");
// });

//delete Message from database
app.get("/delete/:id", function(req, res) {
  // console.log(req.params.id);
  deleteMessage(req, function(err) {
    res.redirect("/guestbook");
  });
});

function deleteMessage(req, callback) {
  const MongoClient = require("mongodb").MongoClient;

  const url = "mongodb://admin:admin123@ds026018.mlab.com:26018/mongo_testdb";

  const dbname = "mongo_testdb";

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("ERROR!:", err);
      } else {
        console.log("Connected to mlab database", url);

        const db = client.db(dbname);

        var query = { _id: mongodb.ObjectID(req.params.id) };

        db.collection("guestb_db").deleteOne(query, function(err, obj) {
          if (err) throw err;
          console.log("Deleted one row from DB!");
        });
        client.close();
        callback();
      }
    }
  );
}

//Scheman avulla datan tallennus DataBaseen
// app.post("/newmessage", (req, res) => {
//   var newData = new Guest(req.body);
//   newData
//     .save()
//     .then(item => {
//       res.send("item saved to database");
//     })
//     .catch(err => {
//       console.log("ERROR!");
//     });
//   res.writeHead(302, {
//     Location: "/guestbook"
//   });

//vanhaa alempana
//post new message+other info to json files
// app.post("/newmessage", function(req, res) {
//   var data = require("./guest.json");
// var data = require("./guest.json");
//push new data to file
// data.push({
//   id: uuidV4(),
//   username: req.body.username,
//   country: req.body.country,
//   message: req.body.message,
//   date: new Date()
// });
// var jsonStr = JSON.stringify(data); // Convert JS value to JSON string
//
// //write new data
// fs.writeFile("guest.json", jsonStr, err => {
//   if (err) throw err;
//   console.log("New data saved.");
// });
// res.writeHead(302, {
//   Location: "/guestbook" // After submit redirect user to /guestbook page
// });
//   res.end();
// });

//404 route
app.get("*", function(req, res) {
  res.send("Can´t find the requested page", 404);
});

app.listen(8081, function() {
  console.log("Works! port: 8081");
});
