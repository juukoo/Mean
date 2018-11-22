//import modules to app
var express = require("express");
var app = express();
var fs = require("fs");
const uuidV4 = require("uuid/v4"); // generates random id´s easily

//require body-parser
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

app.get("/guestbook", function(req, res) {
  var dataset = require("./guest.json");
  res.render("pages/guestbook", { data: dataset });
});
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

//post new message+other info to json files
app.post("/newmessage", function(req, res) {
  var data = require("./guest.json");

  //push new data to file
  data.push({
    id: uuidV4(),
    username: req.body.username,
    country: req.body.country,
    message: req.body.message,
    date: new Date()
  });

  var jsonStr = JSON.stringify(data); // Convert JS value to JSON string

  //write new data
  fs.writeFile("guest.json", jsonStr, err => {
    if (err) throw err;
    console.log("New data saved.");
  });
  res.writeHead(302, {
    Location: "/guestbook" // After submit redirect user to /guestbook page
  });
  res.end();
});

//404 route
app.get("*", function(req, res) {
  res.send("Can´t find the requested page", 404);
});

app.listen(8081, function() {
  console.log("Works! port: 8081");
});
