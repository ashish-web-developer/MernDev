
const Router = require("express").Router();
const Article = require("../models/article");
const Comment = require("../models/comment");

Router.get("/",async function(req,res){
    try{
        let articleArray = await Article.find();
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});

Router.get("/technology",async function(req,res){
    try{
        let articleArray = await Article.find({articleType:"Technology"});
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});

Router.get("/food",async function(req,res){
    try{
        let articleArray = await Article.find({articleType:"Food"});
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});

Router.get("/lifestyle",async function(req,res){
    try{
        let articleArray = await Article.find({articleType:"Lifestyle"});
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});

Router.get("/politics",async function(req,res){
    try{
        let articleArray = await Article.find({articleType:"Politics"});
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});
Router.get("/sociallife",async function(req,res){
    try{
        let articleArray = await Article.find({articleType:"Social life"});
        res.render("blog",{
            articleArray
        });
    }catch(error){
        res.send("got some error");
    }
});


Router.get("/:id",async function(req,res){
    let {id} = req.params;
    try{
        let articleData = await Article.findOne({_id:id});
        let commentData = await Comment.find({articleId:id});
        res.render("article",{
            articleData,
            commentData
        });
    }catch(error){
        res.send("got some error");
    }
});


Router.post("/:id",async function(req,res){
    let {username,email,message} = req.body;
    let articleId = req.params.id;
    let comment = new Comment({
        articleId:articleId,
        username:username,
        email:email,
        message:message
    });
    try{
        await comment.save();
        let articleData = await Article.findOne({_id:articleId});
        let commentData = await Comment.find({articleId:articleId});
        res.render("article",{
            articleData,
            commentData
        });
    }catch(error){
        res.send("got some error");
    };
});



module.exports = Router;
