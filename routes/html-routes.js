var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Article.find({ tag: "javascript" }).limit(10).then(function (dbArticle) {
            res.render("index", {
                articles: dbArticle
            });
        });
    });

    app.get("/article/:id", function (req, res) {
        var article;

        db.Article.find({
            _id: req.params.id
        }).then(function (dbArticle) { 
            article = dbArticle[0];
            return db.Comment.find({
                _id: article.comments
            })
        }).then(function (dbComments) {
            article.comments = dbComments;
            res.render("article", {
                article: article
            });
        });
    });

    app.get("/articles", function (req, res) {
        var pageNum = parseInt(req.query.pageNum);
        var size = parseInt(req.query.size);
        var query = {};

        query.skip = size * (pageNum - 1);
        query.limit = size;

        db.Article.find({}, {}, query, function (err, dbArticles) {
            if (err) {
                res.send(err);
            } else {
                res.render("index", {
                    articles: dbArticles
                });
            };
        });
    });

    app.get("/search", function (req, res) {
        res.render("user-search");
    });

    app.get("/search/:tag", function(req, res){
        db.Article.find({ tag: req.params.tag }).then(function(dbArticles){
            res.render("index", {
                articles: dbArticles
            });
        });
    });
}