const Router = require("express").Router();


Router.get("/",function(req,res){
    res.render("services");
});


module.exports = Router;
