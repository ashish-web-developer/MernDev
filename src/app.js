const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const Subscriber = require("./models/subscriber");
const admin = require("./routes/admin");
const session = require("express-session");
const passport = require("passport");
const passportInitializer = require("./passport-config");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
require("dotenv").config();
let port = process.env.PORT || 8000;

// about
const about = require("./routes/about");
// services
const services = require("./routes/services");
// blog 
const blog = require("./routes/blog");
// contact us
const contactUs = require("./routes/contactUs");

// connection
const connection = require("./db/connection");

// setting database connection
connection().then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log(error);
});
// static files
//const staticPath = path.join(__dirname,"../public");
app.use(express.static("public"));

// Setting EJS
app.set("view engine","ejs");

// Setting express-ejs-layouts
app.use(expressLayouts);

// setting parser
passportInitializer(passport);
app.use(cookieParser());
app.use(express.json());
app.use(session({ 
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:10000*60*60*24
    }
}));
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routes
app.use("/about",about);
app.use("/services",services);
app.use("/blog",blog);
app.use("/contactUs",contactUs);
app.use("/admin",admin);
app.get("/",function(req,res){
    res.render("index");
});

app.post("/subscribe",function(req,res){
    let {email} = req.body;
    let subscriber = new Subscriber({
        email:email
    });
    subscriber.save().then(()=>{
        console.log("data got saved");
        res.send("data got saved");
    }).catch((error)=>{
        console.log(error);
        res.send("got some error");
    });
});

app.use(function(req,res,next){
    res.status(404).send("Page doesn't exist");
});


app.listen(port,console.log(`listening on port ${port}`));
