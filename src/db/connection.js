const mongoose = require("mongoose");



module.exports = async function(){

    await mongoose.connect(process.env.URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    });
}
