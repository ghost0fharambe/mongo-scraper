var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res){
        db.Article.find({}).limit(20).populate("comment").then(function(dbArticle){
            res.render("index", {
                articles: dbArticle
            });
        });
    });

    app.get("/article/:id", function(req, res){
        db.Article.find({ _id: req.params.id }).then(function(dbArticle){
            res.render("article", {
                articles: dbArticle
            });
        });
    });
}