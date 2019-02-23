var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res){
        db.Article.find({}).limit(20).then(function(dbArticle){
            res.render("index", {
                articles: dbArticle
            });
        });
    });

    app.get("/article/:id", function(req, res){
        var article;
    
        db.Article.find({ _id: req.params.id }).then(function(dbArticle){
            article = dbArticle[0];
            return db.Comment.find({ _id: article.comments })
        }).then(function(dbComments){
            article.comments = dbComments;
            console.log(article);
            res.render("article", {
                article: article
            });
        });
    });
}