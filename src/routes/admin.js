const Router = require("express").Router();
const writeArticle = require("./writeArticle");
const adminUser = require("../models/adminUser");
const passport = require("passport");


Router.use("/writearticle",writeArticle);
Router.get("/",function(req,res){
    res.render("adminRegister");
});
function adminAuthenticate(req,res,next){
    const{email,password,adminkey} = req.body;
    if(adminkey != process.env.ADMINKEY){
        res.redirect("/");
    }else{
        next();
    }
}
Router.post("/",adminAuthenticate,function(req,res){
    const {email,password,adminkey} = req.body;
    let user = new adminUser({
        email:email,
        password:password
    });
    try{
        user.save();
        res.redirect("/admin/login");
    }catch(error){
        res.render("adminRegister");
    }
});

Router.get("/login",function(req,res){
    res.render("adminLogin");
});

Router.post("/login",
     passport.authenticate('local', { 
        successRedirect: '/admin/writeArticle',
        failureRedirect: '/admin/login',
        failureFlash: true,
        session:true
     })
);
Router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
});




module.exports = Router;
