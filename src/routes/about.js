const Router = require("express").Router();

Router.get("/",function(req,res){
    res.render("about")
});


module.exports = Router;
