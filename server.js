var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

app.get("/test", function (req, res) {
  
  var result = {
    title: "test",
    link: "test.link"
  };
  // Create a new Article using the `result` object built from scraping
  db.Article.create(result)
    .then(function (dbArticle) {
      // View the added result in the console
      console.log(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
    });
});
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);
// // Send a message to the client
// res.send("Scrape Complete");

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});