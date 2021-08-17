const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

adminSchema.pre("save",async function(){
    try{
        this.password = await bcrypt.hash(this.password,10);
    }catch(error){
        console.log(error);
    }
});

module.exports = mongoose.model("admin",adminSchema);
