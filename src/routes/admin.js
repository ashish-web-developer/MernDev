const Router = require("express").Router();
const writeArticle = require("./writeArticle");


Router.use("/writearticle",writeArticle);
Router.get("/",function(req,res){
    res.render("admin");
});



module.exports = Router;
