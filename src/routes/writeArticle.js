
const Router = require("express").Router();
const multer = require("multer")
const path = require("path");
const Article = require("../models/article");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
function authenticate(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/admin/login");
    }
};
Router.get("/",authenticate,function(req,res){
    console.log(req.isAuthenticated());
    res.render("writeArticle")
});

Router.post("/",upload.single("articleImage"),function(req,res){
    const {reporter,articleType,title,shortArticle,fullArticle,articleImage} = req.body;
    const articleData = new Article({
        reporter:reporter,
        articleType:articleType,
        title:title,
        shortArticle:shortArticle,
        fullArticle:fullArticle,
        articleImage:req.file.filename
    });
    articleData.save().then(()=>{
        console.log("article got saved");
        res.render("writeArticle");
    }).catch((error)=>{
        console.log(error);
        res.render("writeArticle");
    });

});




module.exports = Router;
