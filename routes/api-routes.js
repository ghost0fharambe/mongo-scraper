var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/api/scrape", function (req, res) {
        //Scrapes StackOverflow articles
        //This is the default scrape that occurs
        axios.get("https://stackoverflow.com/questions").then(function (response) {
            var $ = cheerio.load(response.data);
            $("div h3").each(function (i, element) {
                var result = {};

                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.description = $(this).siblings(".excerpt").text();
                result.tag = "javascript"

                db.Article.create(result).then(function (dbArticle) {
                    console.log("Success");
                }).catch(function (err) {
                    console.log(err);
                });
            });
            res.send("Scraping Complete");
        });
    });

    app.get("/api/scrape/:tag", function (req, res) {
        axios.get(`https://stackoverflow.com/questions/tagged/${req.params.tag}`).then(function (response) {
            var $ = cheerio.load(response.data);
            $("div h3").each(function (i, element) {
                var result = {};

                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.description = $(this).siblings(".excerpt").text();
                result.tag = req.params.tag;

                db.Article.create(result).then(function (dbArticle) {
                    console.log("Success");
                }).catch(function (err) {
                    console.log(err);
                });
            });
            res.send("Scraping Complete");
        });
    });

    app.get("/api/articles/all", function (req, res) {
        db.Article.find({}).then(function (result) {
            res.send(result);
        })
    })

    app.post("/api/comment/:id", function (req, res) {
        db.Comment.create(req.body).then(function (dbComment) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    comments: dbComment._id
                }
            }, {
                new: true
            });
        }).then(function (dbComment) {
            res.json(dbComment);
        }).catch(function (err) {
            res.json(err);
        });
    });
}