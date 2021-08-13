
const mongoose = require("mongoose");
const ContactData = require("../models/contactData");
const Router = require("express").Router();

Router.get("/",function(req,res){
    res.render("contactUs")
});

Router.post("/",function(req,res){
    const {username,email,subject,message} = req.body;
    let User = new ContactData({
        username:username,
        email:email,
        subject:subject,
        message:message
    });
    User.save().then(()=>{
        console.log("data got saved");
        res.render("contactUs",{
            alert:"Congratulation you have got subscribed"  
        });
    }).catch((error)=>{
        console.log(error);
        res.render("contactUs",{
            alert:"Got some error"
        });
    });

});



module.exports = Router;      
