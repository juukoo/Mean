var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use(express.static(__dirname + "/public"));


//req body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//view egine ejs
app.set("view engine", "ejs");

//Routes

var indexRoutes = require("./routes");
app.use("/", indexRoutes);

//API
var apiRoutes = require("./API");
app.use("/api", apiRoutes);

app.listen(8081);
console.log("Working!");
