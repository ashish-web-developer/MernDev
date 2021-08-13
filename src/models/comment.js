const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
});


module.exports = mongoose.model("Comment",commentSchema);
