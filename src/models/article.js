const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    reporter:{
        type:String,
        required:true
    },
    articleType:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    shortArticle:{
        type:String,
        required:true
    },
    fullArticle:{
        type:String,
        required:true
    },
    articleImage:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    }
});


module.exports = mongoose.model("Article",articleSchema);
